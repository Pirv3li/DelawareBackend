const Koa = require('koa');
const config = require('config');
const winston = require('winston');

const NODE_ENV = config.get('env'); 
const LOG_LEVEL = config.get('log.level'); 
const LOG_DISABLED = config.get('log.disabled'); 

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`);

const app = new Koa();

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ silent: LOG_DISABLED })
  ]
});

app.use(async (ctx, next) => {
  ctx.body = 'Hello world';
});

app.use(async (ctx, next) => {
  logger.info(JSON.stringify(ctx.request));
  return next();
});

app.listen(9000, () => {
  logger.info('🚀 Server listening on http://localhost:9000');
});
