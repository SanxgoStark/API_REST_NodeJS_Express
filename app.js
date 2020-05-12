'use strict'

/**
 * escribir esta linea para poder utilizar
 * los nuevos tipos de variables
 */

 // libreria para poder renderizar html del servidor al cliente
const hbs = require('express-handlebars')

/**
 * Archivo de configuracion de la aplicacion con express
 */

// Archivo para funcionalidad de Express

 // linea que importa express de la carpeta de node_modules
 const express = require('express')

 // importacion de libreria

 /**
  * Esta libreria funciona como mittlewere, express funiona con 
  * mittlewere que son capas que se le van haciendo y que al 
  * saber que se realiza una peticion HTTP pasa por las
  * distintas capas
  */

 const bodyParser = require('body-parser')

 // Para crear servidor (variable app que llama a espress)
 const app = express()

 // este es un modulo
 const api = require('./routes')

 const productCtrl = require('./controllers/product')

 app.use(bodyParser.urlencoded({extended:false}))

 // Para poder admitir peticiones con cuerpo de mensaje en formato json
 app.use(bodyParser.json())


// configurar el motor de plantilla en express que usamos en node

/**
 * Express lo que va hacer es buscar en una carpeta llamada viewa 
 * las plantillas que crearemos para renderizar las paginas
 * 
 * por defecto tomara un layaut que por defecto se comvertira en el 
 * padre de todas las vistas
 * 
 * cada vista dependiendo de la ruta que nosotros eligamos renderizara una unica plantlla que se
 * renderizara en ese unico template default que nosotros hayamos definido
 */


/**
 * Los ficheros con extension .hbs usen hbs
 * 
 * extname: '.hbs' ---> que los ficheros 
 * handlebars utlizen .hbs como extencion por defecto
 * 
 * app.set('view engine','.hbs') -----> view engine es el que se
 * ha definido arriba como .hbs
 */
app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname: '.hbs'

}))
app.set('view engine','.hbs')

// definicion que para /api se cargen las apis
 app.use('/api',api)

 /**
  * Para /login mande un res.render()
  * 
  * prependListener([indicamos que vista de las que estan a la altura de views que remos que renderize])
  */
 app.get('/login', (req,res) => {
     res.render('login')
 })

 // para el render de product
 app.get('/', (req, res) => {
    res.render('product')
  })

 module.exports = app 