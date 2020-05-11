
// Objeto de javascript que va a exportar varias cosas

/**
 * || 3001 ----> o por defecto el puerto 3001
 * 
 *     [variable de entorno] o si no existe usar la variable de entorno de el string de mongo
 * db: process.env.MONGODB || 'mongodb://localhost:27017/shop'
 */
module.exports = {

    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
    SECRET_TOKEN: 'miclavedetokens'

}