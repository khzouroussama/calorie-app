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

## Requirements

[x] Users should be able to manage food entries

[x] A user should be able to add a new food entry

[x] Food entry should contain the following information: Food/product name (i.e. Milk, banana, hamburger), Calorie value (numeric value)

[x] The first screen a user should see is the list of existing food entries
Calorie limit warning per day

[x] Ensure the users can see for which day they reached that limit. Also, ensure it
is easy to change that limit in the code, per user. You don’t have to create an interface for this purpose.

[x] Implement an admin role

[x] Admin can see a screen with all added food entries of all users and manage existing food entries (read, update, create, delete)

[x] Number of added entries in the last 7 days vs. added entries the week before that. Please Include the current day in those stats

[x] The average number of calories added per user for the last 7 days

[x] A regular user should not be able to access this reporting screen or access its data

[x] User authentication/authorization

[x] Users should be able to filter food entries by entry date (date from / date to)

[x] Place filter fields on the same screen where the list of previously added food entries is

[x] Allow users to take a photo of each food entry
