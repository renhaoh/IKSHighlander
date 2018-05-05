var config = {};

// Connection to database
config.KNEX = {
  client: 'postgresql',
  connection: 'postgres://iks:fris@127.0.0.1:5432/iks'
};

module.exports = config;
