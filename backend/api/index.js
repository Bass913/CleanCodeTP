require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;

const app = express();

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_NOSQL_HOST);
        console.log('database connected');
    } catch (err) {
        console.log(err);
    }
};

app.listen(port || 3000, () => {
    console.log(`Clean Code app listening on port ${port}`);
    connection();
});

app.use(cors());

app.use(express.json()); // application/json


