import ContainerArchivo from "../../containers/containerArchivo.js"

class CarritoDaosArchivo extends ContainerArchivo {
    constructor(rutaDir) {
        super(`${rutaDir}/carrito.json`)
    }

}

export default CarritoDaosArchivo;