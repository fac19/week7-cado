const pg = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const db = new pg.Pool({ connectionString: proccess.env.DATABASE_URL })

module.exports = db
