'use strict'

/**
 * Constrolador que se va a encargar del registro
 * y autentificacion de usuarios en nuestro API-REST
 */

 const mongoose = require('mongoose')

 // Importando el modelo usuario
 const User = require('../models/user')

 const service = require('../services')

 // Creando funciones del controlador

 //Funcion de registro
 /**
  * Como son controladores de http y es tamos utilizando express reciben un obejeto 
  * request y response
  * 
  * no se agrega el password por qu ya se creo una funcion de encryptacion en el modelo
  */

  /**
   * Esta funcionn es la que registra usuarios y los guarda en la base de datos y nos
   * proporciona un token para que la aplicacion cliente ya pueda autenticarse contra nuestra
   * api y pueda acceder a rutas en las que nosotros definamos que son privadas o no
   * 
   */
 function signUp (req,res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password

    })

    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
 }


 // Funcion de registropara autentificacion una ves el usuario este registrado

 /**
  * Funcion que cuando un usuario ya re ha registardo su email y su contraseña estan en la base
  * de datos y queremos acceder de nuevo entonces igual se le crea un token para que
  * pueda acceder
  */
 function signIn(req,res){
    User.find({email: req.body.email},(err,user) => {
        if (err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        req.user
        res.status(200).send({
            message: 'Te has logueadi correctamente',
            token: service.createToken(user)
        })
    })
 }

 //Exportacion de modelos
 module.exports = {
     signUp,
     signIn
 }

