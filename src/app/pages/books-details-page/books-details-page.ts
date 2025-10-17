import { Component } from '@angular/core';
import { BookDetails } from '../../components/book-details/book-details';

@Component({
  selector: 'app-book-details-page',
  imports: [BookDetails],
  templateUrl: './books-details-page.html',
  styleUrl: './books-details-page.css'
})
export class BookDetailsPage {}