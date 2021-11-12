# Shop Serverless Backend Monorepo

## Product Service
- Go to Product Service folder:  `cd product-service`
- See `README.md` in the Product Service folder
- Change `.env.example` to `.env` and fill out with DB connection environment variables
- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm test` to test lambda functions

## Import Service
- Go to Import Service folder:  `cd import-service`
- See `README.md` in the Import Service folder
- Change `.env.example` to `.env` and fill out with correct environment variables
- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm test` to test lambda functions

## Authorization Service
- Go to Authorization Service folder:  `cd authorization-service`
- See `README.md` in the Authorization Service folder
- Change `.env.example` to `.env` and fill out with correct environment variables
- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS

## BFF Service
- Go to BFF Service folder:  `cd bff-service`
- Run `npm i` to install the project dependencies
- Change `.env.example` to `.env` and fill out with correct environment variables to run the app locally
- Run `npm start` to start the app
- Run `npm run dev` to start the app in the development mode
- Run `npm run build` to build the app
- Run `npm run start:prod` to start the app in the production mode