require('dotenv').config();
const express = require('express');
const personRouter = require('./routes/person.router');
const { loginController, signupController } = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});

app.get('/', (req, res)=>{
    res.send("Hi");
});

app.post('/login', loginController);

app.post('/signup', signupController);

app.use('/person', personRouter);