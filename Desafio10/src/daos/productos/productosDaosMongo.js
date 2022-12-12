import ContainerMongo from "../../containers/containerMongo.js";

class ProductosDaosMongoose extends ContainerMongo {
    constructor() {
        super('productos');
    }
}

export default ProductosDaosMongoose