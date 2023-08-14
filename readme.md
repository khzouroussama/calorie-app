# Calorie App Monorepo

This repository contains the codebase for the Calorie App, a comprehensive solution for tracking food entries and managing calorie intake.

## Structure

The monorepo is organized using Yarn workspaces into several packages and applications:

- `apps/mobile`: The React Native mobile application for end-users.
- `packages/api`: The backend API, built with Serverless and AWS Lambda.
- `packages/db`: Abstractions and utilities for interacting with the database.
- `packages/http`: HTTP utilities and middleware for the API.

## Getting Started

1. **Install Dependencies**

   At the root of the monorepo, run:

   ```
   yarn install

   ```

2. **Set Up Environment Variables**

Based on the `.env.example` file in each package, set up the appropriate environment variables for your development, staging, or production environments.

3. **Run the Mobile App**

   ```
   cd apps/mobile
   yarn start
   ```

4. **Deploy the API**

```
   cd packages/api
   serverless deploy --stage <stage-name>
```

Replace `<stage-name>` with `dev`, `staging`, or `prod` based on your needs.

## Testing

To run tests across the monorepo:

```
yarn test
```
