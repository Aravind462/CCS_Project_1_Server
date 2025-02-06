const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const jwtMiddleware = async (req, res, next)=>{
    try{
        const token = req.headers["authorization"].split(" ")[1];
        const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
        const userId = jwtResponse.userId;
        // console.log(jwtResponse, userId);
        const user = await User.findOne({ where: { id: userId } });
        req.userId = user.id
        console.log(user);
        next();
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = jwtMiddleware;