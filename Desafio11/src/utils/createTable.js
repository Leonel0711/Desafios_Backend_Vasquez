import knex from 'knex'
import { getConfig } from '../Knex/confiKnex.js'
//Cliente Confi
//getConfig(CLIENT, DRIVER, USERNAME, PASSWORD, HOST, DB_NAME)
const MARIADB_KNEX_CONFIG = getConfig('mysql', 'mariadb', 'root', 'mariadb', 'localhost', 'backenddesafio')
const SQLITE3_KNEX_CONFIG = getConfig('sqlite3')

export const knexCliMariaDb = knex(MARIADB_KNEX_CONFIG)
export const knexCliSQLite = knex(SQLITE3_KNEX_CONFIG)

//Verify if exist the table
export const existTableMsg = async () => {
    const existeTablaPersonas = await knexCliSQLite.schema.hasTable("mensajes")
    if (!existeTablaPersonas) {
        await knexCliSQLite.schema.createTable("mensajes", table => {
            table.increments('id'),
                table.string('author'),
                table.string('msg'),
                table.string('date')
        })
    }
}
export const existTableAuthor = async () => {
    const existeTablaPersonas = await knexCliSQLite.schema.hasTable("mensajes")
    if (!existeTablaPersonas) {
        await knexCliSQLite.schema.createTable("authors", table => {
            table.string('nombre'),
                table.string('email'),
                table.string('apellido'),
                table.string('edad'),
                table.string('alias'),
                table.string('avatar')
        })
    }
}
export const existTableProd = async () => {
    const existeTablaProd = await knexCliMariaDb.schema.hasTable("productos")
    if (!existeTablaProd) {
        await knexCliMariaDb.schema.createTable("productos", table => {
            table.increments('id'),
                table.string('title'),
                table.integer('price'),
                table.string('thumbnail')
        })
    }
}
