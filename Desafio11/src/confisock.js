import { normalizerArray } from './normalizer.js'
import { Container as clienteDB } from './class/ContArchivo.js'
import { existTableAuthor, existTableMsg, existTableProd } from './utils/createTable.js'
import generateProducts from './utils/faker.js'
import { knexCliMariaDb, knexCliSQLite } from './utils/createTable.js'
import { autentication } from './utils/extraFunctions.js'

const contenedorMensajes = new clienteDB(knexCliSQLite)
const contenedorProducts = new clienteDB(knexCliMariaDb)



existTableMsg();
existTableAuthor();
existTableProd();

export const confiSocket = (io) => {

    io.on('connection', socket => {
        socket.emit('conexion', 'conexion realizada')

        socket.on('mensaje', async mensaje => {
            await contenedorMensajes.guardar("mensajes", mensaje.entities.mensaje[mensaje.result])
            const authores = await contenedorMensajes.buscar("authors")
            if (!autentication(authores, mensaje.entities.author[mensaje.entities.mensaje[mensaje.result].author])) {
                await contenedorMensajes.guardar("authors", mensaje.entities.author[mensaje.entities.mensaje[mensaje.result].author])
            }
            const mensajes = await contenedorMensajes.buscar("mensajes")
            const arraymensaje = { id: 'mensajes', mensajes }
            const msgArrayNorm = normalizerArray(arraymensaje)
            io.sockets.emit('mensajes', msgArrayNorm)
        })
        socket.on('getMensajes', async () => {
            const mensajes = await contenedorMensajes.buscar("mensajes")
            const arraymensaje = { id: 'mensajes', mensajes }
            const msgArrayNorm = normalizerArray(arraymensaje)
            io.sockets.emit('mensajes', msgArrayNorm)
        })

        //Products
        socket.on('getProductsFaker', () => {
            const productos = generateProducts()
            io.sockets.emit('showProductsFaker', productos)
        })

        socket.on('getProducts', async () => {
            const productos = await contenedorProducts.buscar('productos')
            io.sockets.emit('showProducts', productos)
        })

        socket.on('addProduct', async producto => {
            await contenedorProducts.guardar('productos', producto)
            const productos = await contenedorProducts.buscar('productos')
            io.sockets.emit('showProducts', productos)
        })
    })
}
