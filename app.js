const express = require('express');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'student-management.html'));
});

app.use('/students', studentRoutes);

app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
