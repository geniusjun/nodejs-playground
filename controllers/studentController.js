const { v4: uuid } = require('uuid');

const Student = require('../models/student');
const studentStore = require('../data/studentStore');
const asyncHandler = require('../middleware/asyncHandler');

const buildStudentPayload = (body) => {
    const { name, age, major, email } = body;

    return {
        id: uuid(),
        name: name?.trim(),
        age: Number(age),
        major: major?.trim(),
        email: email?.trim()
    };
};

const addStudent = asyncHandler(async (req, res) => {
    const { name, age, major, email } = req.body;

    if (!name || !age || !major || !email) {
        res.status(400).json({
            message: 'name, age, major, and email are required'
        });
        return;
    }

    const newStudent = new Student(buildStudentPayload(req.body));

    if (Number.isNaN(newStudent.age) || newStudent.age <= 0) {
        res.status(400).json({
            message: 'age must be a positive number'
        });
        return;
    }

    await studentStore.addStudent(newStudent);

    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });
});

const getAllStudents = asyncHandler(async (_req, res) => {
    const students = await studentStore.getAllStudents();

    res.status(200).json({
        count: students.length,
        students
    });
});

const getStudentById = asyncHandler(async (req, res) => {
    const student = await studentStore.getStudentById(req.params.id);

    if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
    }

    res.status(200).json(student);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const deletedStudent = await studentStore.deleteStudentById(req.params.id);

    if (!deletedStudent) {
        res.status(404).json({ message: 'Student not found' });
        return;
    }

    res.status(200).json({
        message: 'Student deleted successfully',
        deletedStudentId: deletedStudent.id
    });
});

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    deleteStudent
};
