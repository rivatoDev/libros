import { Component } from '@angular/core';
import { BookList } from '../../components/book-list/book-list';

@Component({
  selector: 'app-book-list-page',
  imports: [BookList],
  templateUrl: './book-list-page.html',
  styleUrl: './book-list-page.css'
})
export class BookListPage {}