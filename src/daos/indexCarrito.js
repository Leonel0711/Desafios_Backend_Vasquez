import typeDB from "./typeDB.js"
let carritoDao
switch (typeDB) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./carrito/carritoDaosArchivo.js')
        carritoDao = new CarritoDaoArchivo("./DB")
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./carrito/carritoDaosFirebase.js')
        carritoDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./carrito/carritoDaosMongo.js')
        carritoDao = new CarritoDaoMongoDb()
        break
    default:
        const { default: CarritoDaoMem } = await import('./carrito/carritoDaosMemoria.js')
        carritoDao = new CarritoDaoMem()
        break
}

export default carritoDao