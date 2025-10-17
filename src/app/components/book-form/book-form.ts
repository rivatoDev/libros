import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Book from '../../models/book';
import { Observable } from 'rxjs';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit{
  form!: FormGroup
  id!: String
  title!: FormControl
  author!: FormControl
  genre!: FormControl
  releaseDate!: FormControl
  cantPages!: FormControl
  valoration!: FormControl

  books!: Book[]
  repeatedBook!: Book | undefined

  titleRequired!: String | null
  authorRequired!: String | null
  genreRequired!: String | null
  releaseDateRequired!: String | null
  cantPagesRequired!: String | null
  valorationRequired!: String | null

  method = input.required<(book: Book) => Observable<Book>>()

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
}

  ngOnInit(): void {
    this.getBooks()
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.pattern(/\S/), Validators.minLength(1), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.pattern(/\S/), Validators.minLength(1), Validators.maxLength(50)]],
      genre: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      cantPages: ['' ,[Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(3000)]],
      valoration: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    })
    this.title = this.form.controls['title'] as FormControl
    this.author = this.form.controls['author'] as FormControl
    this.genre = this.form.controls['genre'] as FormControl
    this.releaseDate = this.form.controls['releaseDate'] as FormControl
    this.cantPages = this.form.controls['cantPages'] as FormControl
    this.valoration = this.form.controls['valoration'] as FormControl

    this.id = this.route.snapshot.params['id']
    if(this.id) {
      this.bookService.getBookById(this.id).subscribe({
        next: data => {console.log(data), this.form.patchValue(data)},
        error: error => {alert("Ocurrio un error al buscar al libro: " + error)}
      })
    } else {
      this.form.controls['id'].setValue(undefined)
    }

    this.title.valueChanges.subscribe(() => {
      if(this.titleRequired) {
        this.titleRequired = null
      }

      this.repeatedBook = 
        this.books.find((book) => 
          book.id !== this.id && 
          book.title?.trim().toLowerCase() === this.title.value?.trim().toLowerCase())
    })

    this.author.valueChanges.subscribe(() => {
      if(this.authorRequired) {
        this.authorRequired = null
      }
    })

    this.genre.valueChanges.subscribe(() => {
      if(this.genreRequired) {
        this.titleRequired = null
      }
    })

    this.releaseDate.valueChanges.subscribe(() => {
      if(this.releaseDateRequired) {
        this.releaseDateRequired = null
      }
    })

    this.cantPages.valueChanges.subscribe(() => {
      if(this.cantPagesRequired) {
        this.cantPagesRequired = null
      }
    })

    this.valoration.valueChanges.subscribe(() => {
      if(this.valorationRequired) {
        this.valorationRequired = null
      }
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: data => {console.log(data), this.books = data},
      error: error => {alert("Ocurrio un error al buscar los libros: " + error)}
    })
  }

  submitForm() {
    if(this.title.hasError("required") || this.title.hasError("pattern")) {
      this.titleRequired = "El titulo es obligatorio"
    }

    if(this.author.hasError("required") || this.author.hasError("pattern")) {
      this.authorRequired = "El autor es obligatorio"
    }

     if(this.genre.hasError("required")) {
      this.genreRequired = "El genero es obligatorio"
    }

     if(this.releaseDate.hasError("required")) {
      this.releaseDateRequired = "La fecha de salida es obligatoria"
    }

     if(this.cantPages.hasError("required")) {
      this.cantPagesRequired = "La cantidad de paginas es obligatoria"
    }

     if(this.valoration.hasError("required")) {
      this.valorationRequired = "La valoracion es obligatoria"
    }

    if(this.form.valid && !this.repeatedBook) {
      const httpMethod = this.method()
      httpMethod(this.form.value).subscribe({
        next: data => {
          console.log(data),
          alert("Operacion realizada con éxito"),
          this.form.reset()
        },
          error: error => {alert("Ocurrio un error con la operacion: " + error)}
      })
      this.router.navigate(['/products'])      
    }
  }
}