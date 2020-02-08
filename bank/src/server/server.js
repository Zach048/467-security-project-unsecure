const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

customer = {
   fistName: "Sam",
   lastName: "Bernstein",
   email: "bernstes@oregonstate.edu",
   phone: "216-990-4430",
   username: "admin",
   password: "admin"
}

app.get('/', function(req, res){
   res.send('Hello from server');
})

app.post('/login', function(req, res){
   console.log(req.body);
   if(req.body.username == "admin" && req.body.password == "admin"){
      console.log("Correct username and password");
   }
   else{
      console.log("Incorrect username and password");
   }
   res.status(200).send({"message": "Login Information received"});
})

app.post('/payment', function(req, res){
   console.log(req.body);
   res.status(200).send({"message": "Data received"});
})

app.post('/personal', function(req, res){
   console.log(req.body);
   res.status(200).send({"message": "Data received"});
})

app.listen(PORT, function(){
   console.log("Server running on localhost: " + PORT);
})