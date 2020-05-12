'use strct'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Libreria para encriptar constraseña
const bcrypt = require('bcrypt-nodejs')

//
const crypto = require('crypto')

/**
 * unique para que no haya emails repetidos
 * lowercase para estandarizar elemail y independientementemente de
 * como lo escriba el usuario , en la base de datos se guarde con minusculas
 * 
 * avatar = la url donde va a estar almacenado el avatar
 * 
 * select para que cuando se haga un get de un usuario la 
 * contraseña nos la envie al cliente
 * 
 * singupDate para tener registrada la fecha en que el usuario se da de alta
 * 
 * lastLoging: cada ves que el usuario se loggee este registro se va a actualizar 
 * para tener un control de los usuarios
 * 
 * funciones que se pueden ejecutar antes o despues de que el modelo haya sido almacenado en la base
 * de datos , en este caso vamos a utilizarlo antes para encriptar la contraseña que introduzca
 * el usuario
 */
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: { type: String, select: false},
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date

})

// Antes de que se salve se ejecute la siguiente funcion
UserSchema.pre('save', (next) => {
    let user = this
    //if (!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err,hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })

        
    })
})

// Otra funcionalidad e mongoose

/**
 * Si el usuario no tiene un email un email regustrado en gravatar lo que 
 * va a hacer es devolver un avatar por defecto
 * 
 * const md5 :  funcion para crear un hash en md5 que es el que por defecto pone
 * gravatar en nuestros avatares
 */
UserSchema.methods.gravatar = function () {
    if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

/**
 * De esta manera ya tenemos nuestro modelo usuario en la base de datos
 * como esquema de mongoose
 */
module.exports = mongoose.model('User',UserSchema)