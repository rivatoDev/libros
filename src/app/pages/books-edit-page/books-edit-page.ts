import { Component } from '@angular/core';
import { BookForm } from '../../components/book-form/book-form';
import { BookService } from '../../services/book-service';
import Book from '../../models/book';

@Component({
  selector: 'app-book-edit-page',
  imports: [BookForm],
  templateUrl: './books-edit-page.html',
  styleUrl: './books-edit-page.css'
})
export class BookEditPage {
  constructor(private bookService: BookService) {}

  editBook() {
    return (book: Book) => {return this.bookService.putBook(book)}
  }
}