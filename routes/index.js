'use strict'

/**
 * Archivo de las rutas que tiene la api
 */

const express = require('express')

/**
 * moduloqu para los
 * Controladores que son las funciones que son las que
 * se comunican con la base de datos y node
 */ 

const productCtrl = require('../controllers/product')

//
const auth = require('../middlewares/auth')

// Usando router de express para las rutas 
const api = express.Router()


 // Creacion de peticion tipo GET para mostrar todos los productos
 /**
  * {} en el find significa que busque todos los productos
  * prodcuts ---> el array de todos los productos
  * 
  * Este metodo buscara todos los productos en la bas de datos
  * 
  * {product} array de productos
  */
 api.get('/product', productCtrl.getProducts)

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
 api.get('/product/:productId', productCtrl.getProduct)

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

 api.post('/product', productCtrl.saveProduct)

 // Ruta para hacer las actualizaciones con put
 // esto le indica en la peticion que quiero actualizar el productId este que mando como parametro
 /**
  * metdo put para actualizancion (UPDATE)
  * 
  * let update es una variable que guarda el cuerpo de la peticion
  */
 api.put('/product/:productId', productCtrl.updateProduct)

 // Ruta de tipo delete para borrar un producto de la base de datos
 /**
  * Product ---> modelo de mongoose
  * product objeto recibido 
  */
 api.delete('/product/:productId', productCtrl.deleteProduct)

 /**
  * Se comprueba si existe autorizacion y si no existe mandara un mensaje de error
  * y en el caso de que si exista tomara el token , lo decodificara, mirara en el payload 
  * si no a caducado y en el caso de que no haya caducado entonces autoriza he indica que
  * el usuario es este que tiene el payload y con el next() pas a la siguiente que es la function
  * 
  */
 api.get('/private',auth.isAuth, function(req,res) {
   res,status(200).send({message: 'Tienes acceso'})

 })

 module.exports = api