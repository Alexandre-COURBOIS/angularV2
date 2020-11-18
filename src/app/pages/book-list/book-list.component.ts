import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../models/Book.model';
import {Subscription} from 'rxjs';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styles: [
  ]
})
export class BookListComponent implements OnInit, OnDestroy {

  books!: Book[];
  bookSubscription!: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.booksService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    )
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  getNewBook() {
    this.router.navigate(['/books','new']);
  }

  deleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  getViewBook(id: number) {
    this.router.navigate(['/books','view',id]);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

}
