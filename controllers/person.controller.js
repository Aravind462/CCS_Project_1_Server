const { User, Person } = require("../models/index");

const getAllPerson = async (req, res)=>{
    try{
        const people = await Person.findAll();
        res.status(200).json(people);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getAllPersonAuthorised = async (req, res)=>{
    const userId = req.userId;
    try{
        const user = await User.findOne({ where: { id: userId } });
        const people = await user.getPeople();
        console.log(user, people, userId);
        
        res.status(200).json(people);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const addPerson = async (req, res)=>{
    try{
        const { fullName, fathersName, dateOfBirth, weddingAnniversary } = req.body;
        if(!fullName || !fathersName || !dateOfBirth){
            res.status(400).send("Please fill all the necessary details: Full Name, Father's Name and Date of Birth");
        }else{
            const user = await User.findOne({ where: { id: req.userId } });
            const person = await user.createPerson({
                fullName,
                fathersName,
                dateOfBirth,
                weddingAnniversary: weddingAnniversary?weddingAnniversary:null
            });
            res.status(200).json({ message: "Details added successfully", person });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

const getOnePerson = async (req, res)=>{
    const { id } = req.params;
    try{
        const person = await Person.findOne({ where: { id } });
        res.status(200).json(person);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const editPerson = async (req, res)=>{
    const { id } = req.params;
    const { fullName, fathersName, dateOfBirth, weddingAnniversary } = req.body;
    try{
        const person = await Person.findOne({ where: { id } });
        if(!person){
            res.status(404).json({ message: "Data not found" });
        }
        if(req.userId != person.userId){
            res.status(400).json({ message: "You are not authorised" });
        }else if(!fullName || !fathersName || !dateOfBirth){
            res.status(400).json({ message: "Please fill all the necessary details: Full Name, Father's Name and Date of Birth" })
        }else{
            const result = await Person.update({
                fullName,
                fathersName,
                dateOfBirth,
                weddingAnniversary: weddingAnniversary? weddingAnniversary:null
            },
            { where : { id } }
        );
            res.status(200).json({ message: "Data updated successfully", result })
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deletePerson = async (req, res)=>{
    const userId = req.userId;
    const { id } = req.params;
    try{
        const person = await Person.findOne({ where: { id } });
        if(!person){
            res.status(404).json({ message: "Person details doesn't exist" })
        }
        else if(person.userId != userId){
            res.status(400).json({ message: "You are not authorized" });
        }else{
            await Person.destroy({ where: { id } });
            res.status(200).json({ message: "Deleted successfully", person });
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllPerson, getAllPersonAuthorised, addPerson, getOnePerson, editPerson, deletePerson }