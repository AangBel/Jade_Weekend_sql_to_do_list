const express = require('express');
const router = express.Router();

// DB CONNECTION
// TODO://
//check the pool .js mapping!
const pool = require('../pool.js');

console.log('we are inside tasks router');

// GET
router.get('/', (req, res) => {
console.log('we are inside the get request')
    let queryText = 'SELECT * FROM "tasks";'

    pool.query(queryText).then(
        (result) => {
            res.send(result.rows)
        }
    ).catch(
        (err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        }
    )
});

// POST

router.post('/', (req, res) => {
    // Do this with a DB instead
    console.log('we are inside the post ')
    //is it ok that this is the same name then in the client i think or the server?
    let newTaskToAddToDatabase = req.body

    console.log("req.body:", req.body);

    const queryText = `
    INSERT INTO "tasks" (task)
    VALUES ($1)
    `

    console.log('The query we\'re sending to postgres:', queryText);

    // Then, find a way to pass it to our pool (aka, the connection to the db).
    // Then it's pg's problem

    pool.query(queryText, [newTaskToAddToDatabase.task])
        .then(
            (result) => {
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        )

});

// PUT


// DELETE



module.exports = router;
