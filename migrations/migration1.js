const sequelize = require('../config/database');
const { User, Person } = require('../index');

const migrate = async ()=>{
    try{
        // await sequelize.sync({ force: true });
        console.log("Migration successful");
    }catch(error){
        console.log(error.message);
    }
}

migrate();