const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res)=>{
    try{
        const { username, email, password } = req.body;
        // console.log(username,email,password);
        const existingUser =  await User.findOne({ where: { email } });
        if(existingUser){
            return res.status(400).send("Email already in use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "Account created successfully", user });
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

const loginController = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        console.log(user, user.id);
        
        if(!user){
            return res.status(400).json({ message: "Incorrect email or password" });
        }
        const passwordStatus = await bcrypt.compare(password, user.password);
        if(!passwordStatus){
            return res.status(400).json({ message: "Incorrect email or password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWTPASSWORD);
        res.status(200).json({ user, token }); 
    }catch(error){
        res.status(500).json({ message: error.message });   
    }
}

module.exports = { loginController, signupController }