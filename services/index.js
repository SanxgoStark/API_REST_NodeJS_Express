'use strict'

const jwt = require('jwt-simple')

//importacion de libreria moment
const moment = require('moment')

// importando secret
const config = require('../config')

// hacer uso de libreria jwt para crear un token con el obejeto usuario
/**
 * 
 * payload nos lo doatos que viajan en el cliente y el servidor y que hay que
 * intentar no poner demasiada informacion en ellos solo la basica
 * 
 * por seguridad el id del usario no se debe de utilizar en esta funcion
 * por que puede poner en riesgo la integridad, pero en este caso se usara para 
 * no complicar tanto la app
 * 
 * fechas para determinar:
 * iat cuando fue creado el token y 
 * exp cuando expira el token
 * 
 * para esto se utiliza la libreria moment en java script
 * 
 * iat: moment().unix() que da el momento exacto cuando se crea
 * 
 * exp: moment().add(14,'days').unix(), que añada 14 dias a la fecha de expiracion
 * apartir de la creacion
 */
function createToken (user) {
    const payloda = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

module.exports = createToken