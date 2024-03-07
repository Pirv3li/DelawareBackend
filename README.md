# 2024-backend-g14

## Vereisten 

Ik verwacht dat volgende software reeds geïnstalleerd is:
- NodeJS
- Yarn
- MySQL Community Server

## Opstarten 

- yarn install
- .env met uw gegevens:
    * NODE_ENV=development
    * DB_HOST=localhost
    * DB_PORT=3306
    * DB_NAME=name
    * DB_USERNAME=root
    * DB_PASSWORD=password
    * AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
- yarn start

## Testen

.env.test met uw gegevens :

- NODE_ENV=test
- DB_HOST=localhost
- DB_PORT=3306
- DB_NAME=name
- DB_USERNAME=root
- DB_PASSWORD=password
- yarn test


