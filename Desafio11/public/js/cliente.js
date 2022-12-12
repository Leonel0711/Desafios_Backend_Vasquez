import { denormalizeMSG, normalizerMSG } from "./normalizer.js";
const socket = io()

const getDate = () => {
    const today = moment();
    return today.format("DD/MM/YYYY HH:mm:ss")
}
const persistMsgs = []
const getLastId = () => {
    const arrayId = persistMsgs.map(element => element.id)
    if (arrayId.length == 0) {
        return 0
    } else {
        const maxId = Math.max(...arrayId)
        return (maxId + 1)
    }
}

const getCompresion = (norm, obj) => {
    const compresionElement = document.getElementById('compresion')
    const compresionNumber = parseInt((obj.length * 100) / norm.length)
    compresionElement.innerText = `(compresión:%${compresionNumber})`
}
//Msg
const btnChat = document.getElementById("enviarMsg");
btnChat.onclick = () => {
    const email = document.getElementById('mail').value;
    const nombre = document.getElementById('name').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;
    const avatar = document.getElementById('avatarUrl').value;
    const msg = document.getElementById('msg').value;
    const date = getDate();
    const objMensaje = { author: { email, nombre, apellido, edad, alias, avatar }, msg, date, id: getLastId() }
    const objNormMensaje = normalizerMSG(objMensaje)
    persistMsgs.splice(0)
    socket.emit('mensaje', objNormMensaje);
    document.getElementById('msg').value = "";
}

socket.on('conexion', msg => {
    console.log("Conexion Realizada");
    socket.emit('getProducts')
    socket.emit('getMensajes')
})


socket.on('mensajes', mensajes => {

    const objMensajes = denormalizeMSG(mensajes)
    getCompresion(JSON.stringify(mensajes), JSON.stringify(objMensajes))
    persistMsgs.splice(0)
    persistMsgs.push(...objMensajes.mensajes)
    document.getElementById("chatText").innerHTML = `<ul>
    ${persistMsgs.map(dataCliente => {
        return (`<li class="listaMsg">
    <b class="userName">${dataCliente.author}</b>[<span class="userDate">${dataCliente.date}</span>]:<p class="userMsg">${dataCliente.msg}</p>
    </li>`)
    }).join('')}
    </ul>
`
})

//Products
const btnEnviar = document.getElementById("enviar");
btnEnviar.onclick = () => {
    const title = document.getElementById('nombre').value;
    const price = document.getElementById('precio').value;
    const thumbnail = document.getElementById('img').value;
    socket.emit('addProduct', { title, price, thumbnail })
}

socket.on('showProducts', productos => {
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