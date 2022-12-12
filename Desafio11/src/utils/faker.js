import { faker } from '@faker-js/faker';
faker.locale = 'es'

function generarProduct(id) {
    return {
        id,
        title: faker.commerce.product(),
        price: faker.datatype.number(),
        image: faker.image.cats(),
    }
}

function generateProducts() {
    const arrayProducts = []
    for (let i = 0; i < 5; i++) {
        arrayProducts.push(generarProduct(i))
    }
    return arrayProducts;
}

export default generateProducts;