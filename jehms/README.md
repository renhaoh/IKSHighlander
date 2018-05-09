# Pre-requisites
npm version 5.0.0 or greater - download from [here](https://www.npmjs.com/get-npm)  
postgres - download from [here](https://www.postgresql.org/download/)


# How to run

## For Linux-Based Systems (Mac)
### Setup Postgres Database Instance:
```
pg_ctl -D /usr/local/var/postgres start

psql postgres

CREATE DATABASE iks;

CREATE USER iks WITH PASSWORD ‘fris’;
GRANT ALL PRIVILEGES ON DATABASE “iks” TO iks;

\q
```
Note: it is worthwhile setting up a macro to run
```
pg_ctl -D /usr/local/var/postgres start
```
if you do not want to run postgres on startup of your machine.  
  
**Navigate to the /app directory before moving on to the next steps.**

### Install necessary packages:
```
npm install
```

### Install knex global cli
```
npm install knex --save
```

### Run Migrations
```
knex migrate:latest
```

**Note: if migrations ever don't work, drop all tables in the iks database and rerun the migrations.**

## For Windows
### Setup Postgres Database Instance:
```
pg_ctl -D “C:/Program Files/PostgreSQL/9.6/data” start

psql -U postgres (password is postgres)

CREATE DATABASE iks;

CREATE USER iks WITH PASSWORD ‘fris’;
GRANT ALL PRIVILEGES ON DATABASE “iks” TO iks;

\q
```
Note: it is worthwhile setting up a macro to run
```
pg_ctl -D “C:/Program Files/PostgreSQL/9.6/data” start
```
if you do not want to run postgres on startup of your machine.  
  
**Navigate to the /app directory before moving on to the next steps.**

### Install necessary packages:
```
npm install
```

### Install knex global cli
```
npm install knex --save
```

### Install win-node-env
```
npm install win-node-env
```

### Run Migrations
```
knex migrate:latest
```

**Note: if migrations ever don't work, drop all tables in the iks database and rerun the migrations.**

### Remove "DEBUG=app*"
Remove "DEBUG=app*" from the package.json file within the /app directory. DO NOT REMOVE THE ENTIRE LINE-just remove the phrase. Otherwise _npm start_ will fail.

# Start application:
```
npm start
```

Navigate to [http://localhost:8000](http://localhost:8000)

# Hosting the Site
Remember to open up port 8000 on the server: Create one Inbound and one Outbound Rule in Windows Firewall that permits port 8000 on private and domain networks.
Keep the application running.

# Running Unit Tests

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.

Single test:
```
npm run test-single-run
```
