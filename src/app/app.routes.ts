import { Routes } from '@angular/router';
import { BookListPage } from './pages/book-list-page/book-list-page';
import { BookAddPage } from './pages/books-add-page/books-add-page';
import { BookEditPage } from './pages/books-edit-page/books-edit-page';
import { BookDetailsPage } from './pages/books-details-page/books-details-page';

export const routes: Routes = [
    {"path": '', redirectTo: 'products', pathMatch: 'full'},
    {"path": 'products', component: BookListPage},
    {"path": 'products/add', component: BookAddPage},
    {"path": 'products/edit/:id', component: BookEditPage},
    {"path": 'products/details/:id', component: BookDetailsPage}
];