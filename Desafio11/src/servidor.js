import express from 'express'
import http from 'http'
import { Server } from "socket.io";

import { router } from './routers/router.js'
import { confiSocket } from './confisock.js'

const app = express();
export const httpServer = new http.Server(app)
const io = new Server(httpServer)

app.set("view engine", "ejs");
app.use(express.static('public'))

app.use('/', router)

//not found page
app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada");
})
confiSocket(io);

