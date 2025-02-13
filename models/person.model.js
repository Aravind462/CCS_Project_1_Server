const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Person = sequelize.define('person', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: Sequelize.STRING
    },
    fathersName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    weddingAnniversary : {
        type: Sequelize.DATEONLY
    }
},{
    timestamps: false
});

module.exports = Person;