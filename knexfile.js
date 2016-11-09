// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'motor_headz'
    }
  },

  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
  
};
