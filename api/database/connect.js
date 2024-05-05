const { Pool } = require('pg')
const { config } = require('dotenv')

// Usar las variables de entorno desde el archivo ".env".
config()

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

module.exports = pool
