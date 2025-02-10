const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res)=>{
    try{
        const { username, email, password } = req.body;
        console.log(username,email,password);
        const existingUser =  await User.findOne({ where: { email } });
        if(existingUser){
            res.status(400).json({ message: "Email already in use"});
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });
            res.status(200).json({ message: "Account created successfully", user });
        }
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

const loginController = async (req, res)=>{
    try{
        const { email, password } = req.body;
        if(!await User.findOne({ where: { email } })){
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }
        const user = await User.findOne({ where: { email } });
        console.log(user, user.id);
        const passwordStatus = await bcrypt.compare(password, user.password);
        if(!passwordStatus){
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWTPASSWORD);
        res.status(200).json({ message: "Login successful", token }); 
    }catch(error){
        res.status(500).json({ message: error.message });   
    }
}

module.exports = { loginController, signupController }