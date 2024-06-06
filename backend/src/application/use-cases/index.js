require('dotenv').config();
const connection = require("../../infrastructure/database/connection");
const cors = require('cors');
const express = require('express');
const port = process.env.PORT;

const app = express();

app.listen(port || 3000, () => {
    console.log(`Clean Code app listening on port ${port}`);
    connection();
});

app.use(cors());

app.use(express.json()); // application/json


