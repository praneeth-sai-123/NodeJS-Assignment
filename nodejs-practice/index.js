var factorial = require('factorial');
var express = require('express');
var fs = require('fs')
var fsp = require('fs').promises;

var app = express();

app.listen(8001);
app.use(express.json());
console.log("you app is listening http://localhost:8001");

app.get('/factorial/:number', function (req, res) {
  let number = req.params.number;
  res.send(`Factorial of ${number}: ${factorial(number)}`);
});

app.post('/addUser',(req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
      if (err){
          console.log(`Error`);
          res.status(400).send('Error adding user');
      } else {
        const users = JSON.parse(data);
        const newUser = {
          id: req.body.id,
          name: req.body.name,
          city: req.body.city
        };
        users.push(newUser);
        fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
              console.log(`Error writing file: ${err}`);
            }});
        res.status(200).send('New user added');
      }
    });
  });

app.get('/users', async (req, res) => {
    try {
        const data = await fsp.readFile('user.json', 'utf8');
        const users = JSON.parse(data);
        res.status(200).send(users);
      } catch (err) {
        console.error("Error", err);
        res.status(500).send('Error');
      }
  });