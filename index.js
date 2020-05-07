'use strict'
/**
 * escribir esta linea para poder utilizar
 * los nuevos tipos de variables
 */

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

 //
 const port = process.env.PORT || 3001

 app.use(bodyParser.urlencoded({extended:false}))

 // Para poder admitir peticiones con cuerpo de mensaje en formato json
 app.use(bodyParser.json())

 // Peticion que se hace al API REST

 /**
  * entre parentisis va la url a la que queremos que escuche este metodo,
  * (req,res) req = peticion y res = respuesta,
  * res.send({ message: 'Hola mundo'} ----> mensaje de respuesta,
  * /:name ----es el req ---peticion y en el mensaje se muestra
  * 
  * al escribir en el navegador:
  * localhost:3001/hola/Santiago
  * como resultado en la pag web se mostrara el mensaje:
  * "{"message":"Hola Santiago"}" 
  */

 app.get('/hola/:name',(req,res) => {
     res.send({ message: `Hola ${req.params.name}`})
 })

 // app escuchara en el puesrto 3000

 /**
  * la palabra function asido sustituida por => (arrow)
  * s
  * app.use añade mittlewere
  */

 app.listen(port, () => {
    
    console.log(`API REST corriendo en http://localhost:${port}`)
 })

 // para ejecutar en terminal lo anterior escribir: node index.js

 // Video #3

 /**
  * instalacion de libreria body-parser que permite pasear el cuerpo
  * de una peticion para poderlos tratar y recoger en node y poder utilizarlos
  * 
  * comando: npm install -S body-parser
  */

  /**
   * libreria nodemon:
   * instalacion de libreria que permite que cada ves que se realize un cambio
   * se actualise automaticamente sin necesida de recargar (ver los cambios en tiempo real
   * sin necesidad de reiniar un servidor)
   * 
   * comando npm install --devDependencies nodemon o resummido npm i -D nodemon
   * 
   * Para utilizar la libreria en el package.json ir a:
   * 
   * "scripts": {
   * "test": "echo \"Error: no test specified\" && exit 1"
   * },
   * 
   * y añadir "start": "nodemon index.js" que llama a nodemon y al fichero index.js
   * apartir de aqui se puede ejecutar el servidor con nodemon con comando "npm start"
   */

   // Video 4 (Como crear un endpoint con GET y parametros en tu API REST)

   /**
    * En este video se añadira que escuche la API REST, la ruta y se comprobara que funciona
    * 
    * para probar en navegador despues de haber colocado el metodo que escucha a una url
    * se ṕuede mostrar en el navegador el mensaje que se ha configurado en ese metodo como respuesta
    * que es {"message":"Hola Mundo"} son en el navegador poner localhost:3001/hola
    */