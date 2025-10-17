import { Component, Input, input, InputSignal, OnInit, output } from '@angular/core';
import Book from '../../models/book';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css'
})
export class BookItem{
  book = input.required<Book>()
  deleted = output<void>()

  constructor(private bookService: BookService, private router: Router) {}

  editBook() {
    this.router.navigate([`/products/edit/${this.book().id}`])
  }

  deleteBook() {
    this.bookService.deleteBook(this.book().id).subscribe({
      next: data => {console.log(data), alert("Producto eliminado exitosamente"), this.deleted.emit()},
      error: error => {alert("Ocurrio un error al eliminar el libro: " + error)}
    })
  }

  details() {
    this.router.navigate([`/products/details/${this.book().id}`])
  }
}