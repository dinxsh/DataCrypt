const express = require('express');
const app = express();
const PORT = 8000;

const types = require('./routes/types')
const api = require('./routes/api')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/types', types)
app.use('/api', api)

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
