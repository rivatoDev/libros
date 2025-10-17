import { Component, OnInit } from '@angular/core';
import Book from '../../models/book';
import { BookService } from '../../services/book-service';
import { FormsModule } from '@angular/forms';
import { BookItem } from '../book-item/book-item';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule, BookItem],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit{
  books!: Book[]
  titleFilter!: String
  categoryFilter!: String
  sort!: "asc" | "desc"

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.books = []
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: data => {console.log(data), this.books = data},
      error: error => {alert("Ocurrio un error al buscar los libros: " + error)}
    })
  }

  getRecentBook() {
    let recentBook: Book = this.books.reduce((a, b) => b.releaseDate > a.releaseDate ? b : a)
    this.router.navigate([`/products/details/${recentBook.id}`])
  }

  filterBooks() {
    let filteredBooks: Book[] = this.books

    if(this.titleFilter && this.titleFilter.trim() != "") {
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(this.titleFilter.toLowerCase()))
    }

    if(this.categoryFilter) {
      filteredBooks = filteredBooks.filter(book => book.genre == this.categoryFilter)
    }

    if(this.sort === "desc") {
      filteredBooks = filteredBooks.sort((a, b) => b.title.localeCompare(a.title.toString()))
    } else {
      filteredBooks = filteredBooks.sort((a, b) => a.title.localeCompare(b.title.toString()))
    }

    return filteredBooks
  }
}