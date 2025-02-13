require('dotenv').config();
const express = require('express');
const personRouter = require('./routes/person.router');
const { loginController, signupController, addProfilePicController } = require('./controllers/user.controller');
const cors = require('cors');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const upload = require('./middlewares/multerMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('./uploads'));

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});

app.get('/', (req, res)=>{
    res.send("Hi");
});

app.post('/login', loginController);

app.post('/signup', signupController);

app.put('/profile/add-pic', jwtMiddleware, upload.single('profilePic'), addProfilePicController);

app.use('/person', personRouter);