const express = require('express');
const app = express();
app.use(express.static('server/public'));
// Routes go here


app.post('/tasks', (req, res)=>{
console.log('in app.post in the server.js!');

// TODO
//this is coming out as undefined!!!! come back to this after group!!!!
let newTaskToAddToDatabase = req.body;
console.log(newTaskToAddToDatabase);


})






let port = 5001;
app.listen(5001, function () {
console.log(`You started the server! It is running on ${port} .`);
})

