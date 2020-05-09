'use strict'

/**
 * escribir esta linea para poder utilizar
 * los nuevos tipos de variables
 */

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

 app.use('/api',api)

 module.exports = app 