//Class constructor to an user
class Usuario {
    constructor(name, lastName) {
        this.nombre = name
        this.apellido = lastName
        this.libros = []
        this.mascotas = []
    }
    //Return full name
    getFullName() {
        return (this.nombre + " " + this.apellido)
    }
    //Add a new pet to array
    addMascota(namePet) {
        this.mascotas.push(namePet);
    }
    //Return number of pets
    countMascotas() {
        return this.mascotas.length
    }
    //Add data of a book to arrayBook
    addBook(nameBook, author) {
        const dataBook = { name: nameBook, author: author }
        this.libros.push(dataBook)
    }
    //Return an array with name of books.
    getBookNames() {
        return this.libros.map(libro => libro.name)
    }
}
//Crete the user
const usuario = new Usuario("Lucas", "Vasquez")
//Get full name of the user
console.log(usuario.getFullName())
//Add some new pets to the user
usuario.addMascota("Bola de Nieve")
usuario.addMascota("Bola de Pelo")
console.log(usuario.countMascotas())
//Add some books to the user
usuario.addBook("Las Crónicas de Narnia", "C. S. Lewis")
usuario.addBook("Las Crónicas de Narnia 2", "C. S. Lewis")
console.log(usuario.getBookNames())
