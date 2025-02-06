const express = require('express');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { getAllPerson, getAllPersonAuthorised, addPerson, getOnePerson, editPerson, deletePerson } = require('../controllers/person.controller');

const router = new express.Router();

router.get('/all', getAllPerson);

router.get('/authorised', jwtMiddleware, getAllPersonAuthorised);

router.post('/add', jwtMiddleware, addPerson);

router.get('/:id', getOnePerson);

router.put('/:id/edit', jwtMiddleware, editPerson);

router.delete('/:id', jwtMiddleware, deletePerson);

module.exports = router;