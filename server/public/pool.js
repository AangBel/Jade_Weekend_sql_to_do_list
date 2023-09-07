// The pg library makes it easy to connect to a database
// and send SQL statements
// const express = require('express');
// const router = express.Router();
const pg = require('pg');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const pool = new Pool({
    host: PGHOST,
    port: 5432,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
})
// Spit out a console log when the pool connects
// successfully:
pool.on('connect', () => {
    console.log('The magical pool thing connected to your postgres database. :)');
})

// Spit out a console log when the pool errors:
pool.on('error', (error) => {
    console.log('The magical pool has errored. Bummer.', error);
})

// A pool is a connection to the database
// We send SQL to the database using `pool.query()`


// const pool = new pg.Pool({
//     // The name of your database.  This will change for every app!
//     database: 'weekend-to-do-app',
//     // Where is your database?  localhost == on your computer!
//     host: 'localhost',
//     // Postgres listens for network connections on port 5432, by default!
//     port: 5432
// });

module.exports = pool;