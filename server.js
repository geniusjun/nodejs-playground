const app = require('./app');

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log('Rho changjun (노창준)');
    console.log(`Student Management API running on port ${PORT}`);
});
