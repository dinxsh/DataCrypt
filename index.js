const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const types = require('./routes/types');
const api = require('./routes/api');
const views = require('./routes/views');
const auth = require('./routes/auth');

app.use('/types', types);
app.use('/api', api);
app.use('/', views);
app.use('/auth', auth);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});