require('dotenv').config();

const connection = require("../../infrastructure/database/connection");
const cors = require('cors');
const express = require('express');
const port = process.env.PORT;
const cardRoutes = require('../../infrastructure/routes/card');


const app = express();

app.listen(port || 3000, () => {
    console.log(`Clean Code app listening on port ${port}`);
    connection();
});

app.use(cors());

app.use(express.json());

app.use('/cards', cardRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, invalid_data: data });
});