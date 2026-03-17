const fsPromises = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, 'studentData.json');

const ensureDataFile = async () => {
    try {
        await fsPromises.access(dataFilePath);
    } catch {
        await fsPromises.writeFile(dataFilePath, '[]\n');
    }
};

const readStudents = async () => {
    await ensureDataFile();
    const rawData = await fsPromises.readFile(dataFilePath, 'utf8');
    return JSON.parse(rawData);
};

const writeStudents = async (students) => {
    await fsPromises.writeFile(
        dataFilePath,
        `${JSON.stringify(students, null, 2)}\n`
    );
};

const getAllStudents = async () => readStudents();

const getStudentById = async (studentId) => {
    const students = await readStudents();
    return students.find(({ id }) => id === studentId) || null;
};

const addStudent = async (student) => {
    const students = await readStudents();
    students.push(student);
    await writeStudents(students);
    return student;
};

const deleteStudentById = async (studentId) => {
    const students = await readStudents();
    const studentToDelete = students.find(({ id }) => id === studentId);

    if (!studentToDelete) {
        return null;
    }

    const filteredStudents = students.filter(({ id }) => id !== studentId);
    await writeStudents(filteredStudents);
    return studentToDelete;
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudentById
};
