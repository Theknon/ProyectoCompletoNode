const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// inicializador
const app = express();

// Configuracion
app.set('port', process.env.POR || 4000);
app.set('views', path.join(__dirname, 'views')); //Dice donde esta la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


// Middlewares   Funciones que ejecuta el servido con cada peticion
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales
app.use((req, res, next) =>{
    next();
});

// Rutas (define las url)
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));


//publicos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});