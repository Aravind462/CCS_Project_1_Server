const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const jwtMiddleware = async (req, res, next)=>{
    try{
        if(!req.headers["authorization"]){
            res.status(401).json({ message: "You are not authorized" });
        }else{
            const token = req.headers["authorization"].split(" ")[1];
            const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
            if(!jwtResponse){
                res.status(401).json({ message: "You are not authorized" });
            }else{
                const userId = jwtResponse.userId;
                // console.log(jwtResponse, userId);
                if(!await User.findOne({ where: { id: userId } })){
                    res.status(401).json({ message: "You are not authorized" });
                }else{
                    const user = await User.findOne({ where: { id: userId } });
                    req.userId = user.id
                    console.log(user);
                    next();
                }
            }
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = jwtMiddleware;