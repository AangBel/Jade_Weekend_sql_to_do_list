const pool = require("./pool");
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "tasks";';

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const taskAttempt = req.body;
  const queryText = `
  INSERT INTO tasks (task)
  VALUES ($1);
  `;

  console.log("The query we're sending to postico:", queryText);

  pool
    .query(queryText, [taskAttempt.task])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    let idToDelete = req.params.id; 
  
    let mySqlQuery = `
    DELETE FROM tasks WHERE id = $1;
    `;
    pool
      .query(mySqlQuery, [idToDelete])
      .then(() => {
        console.log("delete request successful", idToDelete);
        res.sendStatus(202);
      })
      .catch((err) => {
        console.log(`delete request failed: ${idToDelete}`, err);
        res.sendStatus(500);
      });
  });
  
  router.put("/:id",(req, res) => {
    const taskId = req.params.id;
        let mySqlQuery = `
        UPDATE tasks SET status = true WHERE id = $1;
        `;
          pool.
          query(mySqlQuery, [taskId])
          .then(() => {
            console.log('Task marked as complete:', taskId);
            res.sendStatus(200);
          })
          .catch((err) => {
            console.error('Error marking task as complete:', err);
            res.sendStatus(500);
    });
});

module.exports = router;
