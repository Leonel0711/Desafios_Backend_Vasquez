import { normalize, denormalize, schema } from "../normlizr/index.js";

export const denormalizeMSG = (obj) => {
    const mensajeSchema = new schema.Entity('mensajes')
    const dataMSGSchema = new schema.Entity('dataMensajes', {
        mensajes: [mensajeSchema]
    })
    const denormalizeData = denormalize(obj.result, dataMSGSchema, obj.entities)
    return denormalizeData
}
export const normalizerMSG = (obj) => {
    const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
    const msgSchema = new schema.Entity('mensaje',
        { author: authorSchema }
    )
    const normalizeMSG = normalize(obj, msgSchema);
    return normalizeMSG;
}