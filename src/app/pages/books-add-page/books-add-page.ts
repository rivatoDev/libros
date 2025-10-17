import { Component } from '@angular/core';
import { BookForm } from '../../components/book-form/book-form';
import { BookService } from '../../services/book-service';
import Book from '../../models/book';

@Component({
  selector: 'app-book-add-page',
  imports: [BookForm],
  templateUrl: './books-add-page.html',
  styleUrl: './books-add-page.css'
})
export class BookAddPage {
  constructor(private bookService: BookService) {}

  addBook() {
    return (book: Book) => {return this.bookService.postBook(book)}
  }
}