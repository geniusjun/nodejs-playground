const express = require('express');

const {
    addStudent,
    getAllStudents,
    getStudentById,
    deleteStudent
} = require('../controllers/studentController');

const router = express.Router();

router.route('/')
    .post(addStudent)
    .get(getAllStudents);

router.route('/:id')
    .get(getStudentById)
    .delete(deleteStudent);

module.exports = router;
