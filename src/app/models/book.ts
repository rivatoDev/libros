export default interface Book {
    id: String,
    title: String,
    author: String,
    genre: "terror" | "romance" | "ciencia-ficcion" | "misterio" | "fantastico"

    //Details
    releaseDate: Date
    cantPages: Number
    valoration: Number 
}