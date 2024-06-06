require('dotenv').config();
const cors = require('cors');
const express = require('express');
const port = process.env.PORT;

const app = express();

app.listen(port || 3000, () => {
    console.log(`Clean Code app listening on port ${port}`);
});

app.use(cors());

app.use(express.json()); // application/json

app.listen(port || 3000, () => {
    console.log(`Challenge S2 app listening on port ${port}`);
});
