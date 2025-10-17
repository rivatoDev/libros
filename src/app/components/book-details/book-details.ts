import { Component, OnInit } from '@angular/core';
import Book from '../../models/book';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit{
  book!: Book | null | undefined

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBook()
  }

  getBook() {
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe({
      next: data => {console.log(data), this.book = data},
      error: error => alert("Ocurrio un error al buscar el libro: " + error)
    })
  }
}
