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

    // video 5 (Que metodos HTTP y Codigos de respuesta utilizar en tu API REST)

    /**
     * En este video se aprendera
     * que tipo de codigo se pueden mandar al cliente,
     * si ha habido error, si la peticion ha sido correcta y metodos HTTP
     * 
     * HTTP es un protocolo de comunicacion que permiten las tranferencias de
     * informacion en la World Wide Web
     * 
     * HTTP es un protocolo sin estado, es decir, no guarda ninguna información
     * sobre conexiones anteriores. El desarrollo de aplicaciones web necesita
     * frecuentemente mantener estado. Para esto se usan las cookies,
     * que es información que un servidor puede almacenar en el sistema cliente.
     * Esto le permite a las aplicaciones web instituir la noción de sesión,
     * y también permite rastrear usuarios ya que las cookies pueden guardarse en
     * el cliente por tiempo indeterminado.
     * 
     * Para que una API REST sea ful se utilizan los metodos de peticion HTTP:
     *  - GET
     *  - POST
     *  - PUT
     *  - DELETE 
     * 
     *  GET: El método GET solicita una representación del recurso especificado.
     *  Las solicitudes que usan GET solo deben recuperar datos y no deben tener
     *  ningún otro efecto. (Esto también es cierto para algunos otros métodos HTTP.)
     * 
     *  POST: RFC 2616. Envía los datos para que sean procesados por el recurso identificado.
     *  Los datos se incluirán en el cuerpo de la petición. Esto puede resultar en la creación
     *  de un nuevo recurso o de las actualizaciones de los recursos existentes o ambas cosas.
     * 
     *  PUT: ( RFC 2616 ) Sube, carga o realiza un upload de un recurso especificado (archivo
     *  o fichero) y es un camino más eficiente ya que POST utiliza un mensaje multiparte y el
     *  mensaje es decodificado por el servidor. En contraste, el método PUT permite escribir
     *  un archivo en una conexión socket establecida con el servidor. La desventaja del método
     *  PUT es que los servidores de alojamiento compartido no lo tienen habilitado.
     *  Ejemplo: PUT /path/filename.html HTTP/1.1
     * 
     *  DELETE: RFC 2616. Borra el recurso especificado.
     * 
     * Con esto la API REST admitiria LECTURA, ESCRITURA, ACTUALIZACION Y BORRADO
     * 
     * => CODIGOS DE RESPUESTA
     * 
     *      SERVIDOR ----a----> CLIENTE
     * 
     * Para informarle como ha sido la peticion
     * 
     * El código de respuesta o retorno es un número que indica que ha pasado con la petición. 
     * El resto del contenido de la respuesta dependerá del valor de este código. El sistema 
     * es flexible y de hecho la lista de códigos ha ido aumentando para así adaptarse a los 
     * cambios e identificar nuevas situaciones. Cada código tiene un significado concreto. 
     * Sin embargo el número de los códigos están elegidos de tal forma que según si pertenece 
     * a una centena u otra se pueda identificar el tipo de respuesta que ha dado el servidor:
     * 
     * Códigos con formato 1xx: Respuestas informativas. Indica que la petición ha sido recibida y se está procesando.
     * Códigos con formato 2xx: Respuestas correctas. Indica que la petición ha sido procesada correctamente.
     * Códigos con formato 3xx: Respuestas de redirección. Indica que el cliente necesita realizar más acciones para finalizar la petición.
     * Códigos con formato 4xx: Errores causados por el cliente. Indica que ha habido un error en el procesado de la petición a causa de que el cliente ha hecho algo mal.
     * Códigos con formato 5xx: Errores causados por el servidor. Indica que ha habido un error en el procesado de la petición a causa de un fallo en el servidor.
     * 
     * https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto
     */