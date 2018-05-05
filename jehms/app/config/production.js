var config = {};

// Connection to database
config.KNEX = {
  client: 'postgresql',
  connection: 'postgres://' + process.env.RDS_USERNAME + ':' + process.env.RDS_PASSWORD +
                '@' + process.env.RDS_HOSTNAME + ':' + process.env.RDS_PORT + '/' + process.env.RDS_DB_NAME
};


module.exports = config;
