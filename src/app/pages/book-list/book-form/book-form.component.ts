import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../../services/books.service';
import {Router} from '@angular/router';
import {Book} from '../../../models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styles: [
  ]
})
export class BookFormComponent implements OnInit {

  // Formulaire avec la méthode Réactive !

  bookForm!: FormGroup;
  fileisUploading = false;
  fileUploaded = false;
  fileUrl!: string;

  constructor(private formBuilder: FormBuilder, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required,Validators.min(2)]],
      author: ['', [Validators.required, Validators.min(2)]]
    });
  }

  saveBook() {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileisUploading = true;
    this.booksService.uploadFile(file).then(
      // @ts-ignore
      (url: string) => {
        this.fileUrl = url;
        this.fileisUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  // @ts-ignore
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
