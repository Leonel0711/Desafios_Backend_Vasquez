import { Router } from 'express'

export const router = new Router()

router.get("/", (req, res) => {
    res.render("pages/formu")
})

router.get("/api/productos-test", (req, res) => {
    res.render("pages/mock")
})
