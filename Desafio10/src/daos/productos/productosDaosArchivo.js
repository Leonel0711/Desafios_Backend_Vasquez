import ContainerArchivo from "../../containers/containerArchivo.js"
class ProductosDaosArchivo extends ContainerArchivo {
    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}

export default ProductosDaosArchivo