const User = require('./user.model');
const Person = require('./person.model');

User.hasMany(Person);
Person.belongsTo(User);

module.exports = { User, Person };