export const autentication = (array, obj) => {
    return array.find(author => author.email == obj.email)
}