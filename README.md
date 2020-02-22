# Riskie
Fraud detection using a graph and confidence scores.

## Install dependencies

Clone this project on your system

```
git clone git@github.com:abey-alex/riskie.git
```

Install the dependencies using the following command.

```
npm install

-- OR --

yarn
```

To start the server, use the following command
```
npm start
```

If you want to try the dev build, use the following

```
npm run dev
```

To run test cases, use the following
```
npm run test
```

## Environment Settings

We use [dotenv](https://github.com/motdotla/dotenv) for all our runtime settings. The precedence of settings is as follows:

-   Any process.env set on the machine level will be set first. We use this on production deployments, where consul keyvals will get set first.

-   Settings inside dotenv will be loaded by `dotenv` library. If there is any value already set in above step, it will be skipped here.

To start with, you can copy a sample env file

```
cp .env.example .env
```

## Verifying results

There are 2 ways to verify the results

### 1. REST API
You can call GET `/api/transactions?transactionId=5c868b224aafffc5fcffd9c3&confidenceLevel=1` to get the results

### 2. GraphQL
A GraphQL playground is available at `/graphql` endpoint, with introspection support.

Both mechanisms will return the same output.


## Code Quality and Maintenance
This project uses [Prettier](https://prettier.io/) and [TSLint](https://palantir.github.io/tslint/) to maintain code quality.
