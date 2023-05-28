const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');

// app.set('view engine', 'pug'); // Templating Engine
// Templates are not part of server-side code, they are basically just templates which are picked up on the fly

app.set('views', 'views');

// 'get' and 'post' will do an exact match to the routes, not is the case with 'use'

// '/' is the default route
app.use(bodyParser.urlencoded({extended: false})); // will parse the request-body
app.use(express.static(path.join(__dirname, 'public'))); // static middleware :- serves files statically
// you can register multiple static folders, and it will funnel the request through all of them until it has a first hit for the file its looking for


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);