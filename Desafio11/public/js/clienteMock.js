const socket = io()
socket.on('conexion', msg => {
    console.log(msg);
    socket.emit('getProductsFaker')
})

socket.on('showProductsFaker', productos => {
    if (productos.length != 0) {
        showTable();
        upDateTable(productos)
    } else {
        showNoProducts();
    }
})



const showNoProducts = () => {
    document.getElementById('products').innerHTML = `<div id="noProducts">
    <h3>No hay producto</h3>
</div>`
}
const showTable = () => {
    document.getElementById('products').innerHTML = `
    <div class="d-flex align-items-center flex-column" id="tabla">
            <table class="table table-dark">
                <tr>
                    <th>nombre</th>
                    <th>precio</th>
                    <th>img</th>
                </tr>
                <tbody id="tablaProducts">
                </tbody>
            </table>
        </div>`
}
const upDateTable = (productos) => {
    const contenido = productos.map(product => {
        return (`<tr><td>${product.title}</td><td>$${new Intl.NumberFormat('es-MX').format(product.price)}</td><td><img src="${product.thumbnail}" alt="${product.title}" width="50px" height="50px"></td></tr>`)
    }).join('');
    document.getElementById('tablaProducts').innerHTML = contenido;
}