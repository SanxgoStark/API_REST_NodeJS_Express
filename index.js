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

 // importacion delibreria mongoose
 const mongoose = require('mongoose')

 // Para usar el esquema Producto en este index
 /**
  * En este caso como no es una libreria instalada por npm
  * hay que indicar la ruta
  */
 const Product = require('./models/product')

 // Para crear servidor (variable app que llama a espress)
 const app = express()

 //
 const port = process.env.PORT || 3001

 app.use(bodyParser.urlencoded({extended:false}))

 // Para poder admitir peticiones con cuerpo de mensaje en formato json
 app.use(bodyParser.json())

 // Creacion de peticion tipo GET para mostrar todos los productos
 /**
  * {} en el find significa que busque todos los productos
  * prodcuts ---> el array de todos los productos
  * 
  * Este metodo buscara todos los productos en la bas de datos
  * 
  * {product} array de productos
  */
 app.get('/api/product',(req,res) => {
    Product.find({},(err,products) => {
       if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
       if (!products) return res.status(404).send({message: `No existen productos`})

       res.status(200).send({product: products})
    }) 

    
 })

 // Ruta GET para acceder a un unico recurso
 /**
  * Este metodo buscara en la base de datos UN producto con el id especificado
  * 
  * [objeto con la clavve producto]: [valor es una variable que se llama product]
  * product: product
  * 
  * en el caso de obejtis que la clave y el valor sean los mismos en este caso product
  * se puede usar product solo una ves
  */
 app.get('/api/product/:productId', (req,res) => {
    
   let productId = req.params.productId
   
    Product.findById(productId, (err,product) => {
       if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
       if (!product) return res.status(404).send({message: `El producto no existe`})
       res.status(200).send({product: product})
    })

 })

 /**
  * Ruta de tipo POST para poder subir los productos
  * misma ruta que get pero se accede de diferente forma
  * 
  * para acceder al cuerpo de la peticion gracias al mittleware de body-parse
  * en req.body se tendra todo lo que se mande del cuerpo de la peticion
  * 
  * Como respuesta para el cliente:
  * 
  * codigo 200 :todo ha ido bien
  * mensaje: El producto se ha recibido
  * 
  * Como probar una peticion de tipo post ? por que no se ṕuede
  * escribir la url en el navegador directamente, para esto se usa postman aplicacion
  * 
  * con postma se envian una serie de atributos de un producto tales como:
  * 
  * [Object: null prototype] {
  * name: 'Mackbook Pro',
  * precio: '1200',
  * photo: 'macbook.png',
  * category: 'laptop '
  * }
  * 
  * y estos se envian a la api para pobar el post, como resultado aroja "message": "El producto se ha recibido"
  * esto indica que se ha realizado con exito el post
  */

  /**
   * req.body ---> cuerpo de la peticion
   * 
   * almacenar un producto en nuestra base de datos:
   * Product es el modelo de nuestra base de datos
   * 
   * // variable product que sea un nuevo producto
   * let product = new Product()
   * 
   * Gracias a la libreria bodyParse.json() y se le esta
   * diciendo que utilice json el cuerdo de la peticion ya biene
   * parseado ya biene como un objeto json y se puede acceder a cada
   * propiedad de manera simple
   * 
   * en category si se ingresa otra categoria que no sea una de las que se
   * definieron en el esquema no se va a almacenar por que esquema sea definido de
   * esa manera para no pemitir otro tipo de dato
   * 
   * como es un objeto de mongoose ya tiene acceso a las funciones de mongodb y por eso
   * se puede usar product.save() para salvarlo
   * 
   * save((err,productStored) save recibe dos parametros un error (err) -- si lo hubiese
   * y productStored que es el producto salvado
   * 
   * al guardarse en la base de datos mongodb le asigna un id unico y ese id
   * nos servira para hacer posteriores modificaciones sobre el producto
   * 
   * POST permite almacenar
   */

 app.post('/api/product',(req,res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err,productStored) => {
       if (err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})

       res.status(200).send({product: productStored})
    })
 })

 // Ruta para hacer las actualizaciones con put
 // esto le indica en la peticion que quiero actualizar el productId este que mando como parametro
 /**
  * metdo put para actualizancion (UPDATE)
  * 
  * let update es una variable que guarda el cuerpo de la peticion
  */
 app.put('/api/product/:productId', (req,res) => {

   let productId = req.params.productId
   let update = req.body

   Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
      if (err) res.status(500).send({message: `Error alactualizar el producto: ${err}`})

      res.status(200).send({product: productUpdate})
   })
 })

 // Ruta de tipo delete para borrar un producto de la base de datos
 /**
  * Product ---> modelo de mongoose
  * product objeto recibido 
  */
 app.delete('/api/product/:productId',(req,res) => {

   let productId = req.params.productId

   Product.findById(productId,(err,product) => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      
      product.remove(err => {
         if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
         res.status(200).send({message: `El producto ha sido eliminado`})
      })
   })


 })

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
  * app escuchara en el puesrto 3000
  * 
  * la palabra function asido sustituida por => (arrow)
  * app.use añade mittlewere
  */
 
 // para ejecutar en terminal lo anterior escribir: node index.js

 mongoose.connect('mongodb://localhost:27017/shop', (err,res) =>{

   if(err) {
      return console.log(`Error al conectar a la base de datos:${err}`)
   }
   console.log('Conexion a la base de datos establecida....')

   app.listen(port, () => {
    
      console.log(`API REST corriendo en http://localhost:${port}`)
   })

 })



 