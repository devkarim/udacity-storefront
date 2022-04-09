# Storefront Backend Project

## Getting Started

A udacity course project, basic e-commerce backend based. To get started, clone this repo and use `yarn` to install the required dependencies. Before you start, make sure to include env variables as stated below. Once done, type `yarn start` or `yarn watch` to start the project.

## Environmental Variables

Make sure to include these env variables inside your .env file:

```
ENV=dev
PORT=3000

POSTGRES_HOST=your_host
POSTGRES_DB=your_db_name
POSTGRES_DB_TEST=your_test_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password

SALT_ROUNDS=10
BCRYPT_SECRET=your_bcrypt_secret
JWT_SECRET=your_jwt_secret
```

## Testing

You can test the project overall via `yarn test`. This test includes model testing (user, order, product), handlers and services testing.

## Documentation

Check the project docs from [here](https://github.com/devkarim/udacity-storefront/blob/main/DOCS.md).

## See also

- `yarn watch` - Watches for file changes and restarts project upon.
- `yarn db-up` - Up migrations.
- `yarn db-down` - Down migrations.
- `yarn db-create` - Create databases associated with env vars.
- `yarn db-drop` - Drop databases associated with env vars.

NOTE: The scripts inside package.json are compatible with Windows!
