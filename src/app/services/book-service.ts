import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Book from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly URL = "http://localhost:3000/books"

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(this.URL)
  }

  getBookById(id: String) {
    return this.http.get<Book>(`${this.URL}/${id}`)
  }

  postBook(book: Book) {
    return this.http.post<Book>(this.URL, book)
  }

  putBook(book: Book) {
    return this.http.put<Book>(`${this.URL}/${book.id}`, book)
  }

  deleteBook(id: String) {
    return this.http.delete<Book>(`${this.URL}/${id}`)
  }
}