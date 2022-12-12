/* const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "public"))

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`)
})

const { Router } = express;
const productosRouter = new Router();


const handleVerify=(atributo)=>{
    return (atributo!="") 
}

const productos = []

productosRouter.get("/", (req, res) => {
    res.render("pages/formu",{titlePage:"Formulario"})
})
productosRouter.post("/", (req, res) => {
    let objeto = req.body;
    const veri = handleVerify(objeto.title)&&handleVerify(objeto.price)&&handleVerify(objeto.thumbnail);
    if(veri){
        if (productos.length != 0) {
            let arrayId = productos.map(item => item.id);
            let highId = Math.max(...arrayId);
            objeto.id = highId + 1;
        } else objeto.id = 1;
        productos.push(objeto);
    }
    res.redirect('/')
})

//create subroutes
app.use("/api/productos", productosRouter);
//show index.html
app.use('/static', express.static('public'));

 */

const { servidor } = require('./servidor.js');

const server = servidor.listen(8080, () => {
    console.log(`conectado y escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))