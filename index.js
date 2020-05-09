'use strict'

/**
 * Archivo que pide toda la innformacion ya sea del config
 * y de la configuracion de la aplicacion con express
 */

 // importacion de libreria mongoose
 const mongoose = require('mongoose')

 // Referencia a la app
 const app = require('./app')

 const config = require('./config')

 // Metodo mongoose conect para conectar API REST con Mongo

 /**
  * localhost ---> host en el que nos encontramos
  * si estamos en el puerto por defecto no habria
  * falta de agregar el puerto pero aun asi se agrega y
  * es 27017/[nombre base de datos]
  * 
  * (err,res) ----> callback
  * err ---> error si lo hubiese
  * res ---> respuesta
  * 
  * if(err) throw err ---> si hay error pues que lo lanze, esto lanza el error por de fecto que arroja nodemon
  * si se desea modificar el mensaje al momento de lanzar ese error usar:
  * 
  * if(err) {
  * return console.log(`Error al conectar a la base de datos:${err}`)
  * }
  * 
  * y si no que muestre console.log('Conexion a la base de datos establecida....')
  */


 /**
  * app escuchara en el puesrto 3001
  * 
  * la palabra function asido sustituida por => (arrow)
  * app.use añade mittlewere
  */
 
 // para ejecutar en terminal lo anterior escribir: node index.js


 /**
  * Se conecta a la base de datos y una ves conectada a la base de datos
  */
 mongoose.connect(config.db, (err,res) =>{

   if(err) {
      return console.log(`Error al conectar a la base de datos:${err}`)
   }
   console.log('Conexion a la base de datos establecida....')

   // Empieza a escuchar nuestro servidor de express
   app.listen(config.port, () => {
    
      console.log(`API REST corriendo en http://localhost:${config.port}`)
   })

 })

 // config esta en el archivo de configuracion config


 