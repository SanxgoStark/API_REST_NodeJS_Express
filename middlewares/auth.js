'use strict'

const services = require('../services')

/**
 * 
 * atributo next para que pase la ejecusion de la ruta cuando creemos
 * el controlador de la ruta el middleware le pase la funcionalidad al controlador final
 * 
 * estus 403 --> prohibido el acceso
 * 
 * spli() --> desglose
 * split convierte toda la cabezera en un array con tantos elementos como
 * espacios alla 
 * 
 * const token = req.headers.authorization.split("")[1] --> corresponde al token que nos 
 * ha enviado el cliente en la cabezera
 * 
 * const payload --> decodificacion de este token con la libreria jwt que se ha importado
 * 
 * const payload = jwt.decode(token,config.SECRET_TOKEN) ---> Esto contendria ya el contenido
 * en texto o el obejeto payload ya descodificado que nos envia el usuario desde el cliente
 * en el token que envian las cabezeras
 */
function isAuth (req,res,next) {
    if(!req.headers.authorization) {
        return res.status(403).send({
            message: 'No tienes autorizacion'  
        })
    }
    
    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
    
}


module.exports = isAuth 