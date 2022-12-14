const fs = require('fs')
class Contenedor {
    constructor(nameArchivo) {
        this.nameArc = nameArchivo
    }

    async save(object) {
        let auxArray = []
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            auxArray = JSON.parse(data)
            let idArray = auxArray.map(obj => obj.id)
            let highId = Math.max(...idArray)
            object.id = highId + 1;
            auxArray.push(object);
            fs.writeFileSync(this.nameArc, JSON.stringify(auxArray))
        }
        catch {
            object.id = 0;
            auxArray.push(object);
            fs.writeFileSync(this.nameArc, JSON.stringify(auxArray))
        }
        return object.id
    }
    async getById(number) {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            let auxArray = JSON.parse(data)
            const object = auxArray.find(obj => obj.id === number)
            return object
        }
        catch {
            return null
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            const auxArray = JSON.parse(data)
            return auxArray
        }
        catch {
            return null
        }
    }
    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            const auxArray = JSON.parse(data)
            const newArray = auxArray.filter(obj => obj.id !== number)
            fs.writeFileSync(this.nameArc, JSON.stringify(newArray))
        }
        catch {
            return "No hay objetos en el archivo"
        }
    }
    deleteAll() {
        fs.writeFileSync(this.nameArc, "")
    }
}

const newArchivo = new Contenedor("./archivo_prueba.txt");
newArchivo.save({ title: "Grafica RTX 4070", price: 300040, thumbnail: "grafica.png" }).then(resolve => console.log(resolve));
newArchivo.getById(1).then(resolve => console.log(resolve));
newArchivo.getAll().then(resolve => console.log(resolve));
newArchivo.deleteById(2);
newArchivo.deleteAll();

