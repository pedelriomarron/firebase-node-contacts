//Configuracion del Servidor
const express = require('express');
const morgan = require(`morgan`)
//vistas
const exphbs = require('express-handlebars')
//Nos permite trabajar con los directorios
const path = require('path')

const app = express();

//settings
    //Si en mi servidor existe un puerto definido usalo sino el 3000
app.set('port', process.env.PORT || 3000)
    // path join combina dos rutas , __dirname ruta entera de carpeta del SO
    // seteamos la ruta de las views
app.set('views', path.join(__dirname,'views') )
    // Definimos el motor de plantillas
app.engine('.hbs',exphbs({
    //plantilla default html se llamara main
    defaultLayout: 'main',
    //Cambiamos a la extension que queramos
    extname: 'hbs'
}))
    //Utilizamos motor definido antes
app.set('view engine', '.hbs')


// middlewares o funciones intermedias
app.use(morgan('dev'))
    //Aceptemos formularios que llegan html y extender SOLO de JSON (NAda de imagenes)
app.use(express.urlencoded({ extended: false}))


//routes
    //Usa las rutas defindias en este archivo
app.use(require('./routes/index'))

// static files
    //Definir ruta de los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app