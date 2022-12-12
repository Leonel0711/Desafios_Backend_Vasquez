import { normalize, schema } from 'normalizr'


export const normalizerArray = (obj) => {
    const mensajeSchema = new schema.Entity('mensajes')
    const dataMSGSchema = new schema.Entity('dataMensajes', {
        mensajes: [mensajeSchema]
    })
    const normalizeMSG = normalize(obj, dataMSGSchema);
    return normalizeMSG;
}

