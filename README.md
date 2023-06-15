# API FOR BIZZ-IT

---

## Description

This is a REST API for Bizz-It, a mobile app to connect potential franchisees and franchisors more easily. It is built with Node.js, Express, and Google Cloud.

## Installation

1. Clone this repository

```bash
git clone
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on the `.env.example` file contain these following environment variables:

```bash
DB_NAME= # name of your database
DB_USERNAME= # username of your database
DB_PASSWORD= # password of your database
JWT_SECRET= # secret key for JWT
GCLOUD_STORAGE_BUCKET= # name of your GCP storage bucket
PROJECT_ID= # your GCP project ID
PORT= # port for your server
NODE_ENV= # environment for your server
EMAIL_USERNAME= # email for email-based otp
EMAIL_PASSWORD= # password for email-based otp
```

4. Create a `credentials.json` file for your GCP service account. You can find the instructions [here](https://cloud.google.com/docs/authentication/production#creating_a_service_account).

5. Run the development server

```bash
npm run server
```

## Libraries Used

- [Express](https://expressjs.com/) - Node.js web application framework
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for Postgres
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js
- [@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage) - Google Cloud Storage client library
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for generating JWT
- [nodemailer](https://www.npmjs.com/package/nodemailer) - Library for sending emails
- [multer](https://www.npmjs.com/package/multer) - Middleware for handling multipart/form-data
- [dotenv](https://www.npmjs.com/package/dotenv) - Library for loading environment variables
- [cors](https://www.npmjs.com/package/cors) - Middleware for enabling CORS
- [joi](https://www.npmjs.com/package/joi) - Library for validating data

## API Documentation

You can find the documentation for this API [here](https://documenter.getpostman.com/view/18875711/2s93m7ULc5#ccac4d22-9fd6-4849-bd30-3a498830aa77).

## GCP Deployment

This API is using Google Cloud Platform for deployment.

GCP Services used:

- App Engine
- Cloud SQL
- Cloud Storage

## GCP Architecture

![GCP Architecture](https://storage.googleapis.com/bizzit-387412.appspot.com/cloud%20architecture.png)
