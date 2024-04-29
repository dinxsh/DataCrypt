const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

const types = require('./routes/types')
const api = require('./routes/api')
const views = require('./routes/views')

app.use('/types', types)
app.use('/api', api)
app.use('/', views)

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
