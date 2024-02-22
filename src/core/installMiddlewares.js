const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');

const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const ServiceError = require('./serviceError'); 
const NODE_ENV = config.get('env');
const {getLogger} = require('./logging');
const koaHelmet = require('koa-helmet');
const { koaSwagger } = require('koa2-swagger-ui');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('../swagger.config');
const isDevelopment = NODE_ENV==='development';


/**
 * Install all required middlewares in the given app.
 *
 * @param {koa.Application} app - The Koa application.
 */
module.exports = function installMiddleware(app) {
   app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );
  

  app.use(bodyParser());

  app.use(koaHelmet({
    contentSecurityPolicy: isDevelopment ? false : undefined,
  }));

  app.use(async (ctx, next) => {
    try {
      await next(); 
    } catch (error) {
      getLogger().error('Error occured while handling a request', { error }); 
      let statusCode = error.status || 500; 
      let errorBody = { 
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };
  
      if (error instanceof ServiceError) {
        
        if (error.isUnauthorized) {
          statusCode = 401;
        }
      
        if (error.isForbidden) {
          statusCode = 403;
        }

        if (error.isNotFound) {
          statusCode = 404;
        }
  
        if (error.isValidationFailed) {
          statusCode = 400;
        }
      }
  
      ctx.status = statusCode; 
      ctx.body = errorBody; 
    }
  });

  if (isDevelopment) {
    const spec = swaggerJsdoc(swaggerOptions);
    app.use(
      koaSwagger({
        routePrefix: '/swagger',
        specPrefix: '/openapi.json',
        exposeSpec: true,
        swaggerOptions: {
          spec,
        },
      }),
    );
  }
  
  // Handle 404 not found with uniform response
  app.use(async (ctx, next) => {
    await next();
  
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND',
        message: `Unknown resource: ${ctx.url}`,
      };
    }
  });
};

