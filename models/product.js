'use strict'

const mongoose = require('mongoose')
/**
 * comongoose un modelo para nuestra base de datos en concreto (producto)
 * ,Schemas es una propiedad de comongoose nos permite definir el esquema de
 * nuestro modelo, que campos tiene?..!! y
 * realizar algunas validaciones
 */
const Schema = mongoose.Schema

// Creacionn de esquema
/**
 * enum = enumeracion
 */

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: {type: Number, default: 0},
    category: { type: String, enum: ['computers','phones','accesories']},
    description: String
})

// Para exportar el anterior moedlo

/**
 * Asi de esta manera el modelo sera accesible
 * desde toda la aplicacion
 * 
 * (['Nombre'],[Esquema que se esta utilizando])
 * 
 * tiene que ser exportado para que sepues pueda ser importado mongoose por eso
 * se iguala a module.exports
 * 
 * con esto se exporta el modelo:
 * module.exports = mongoose.model('Product',ProductSchema)
 */

module.exports = mongoose.model('Product',ProductSchema)