import { Component, OnInit } from '@angular/core';
import {Book} from '../../../models/Book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styles: [
  ]
})
export class SingleBookComponent implements OnInit {

  book!: Book;
  //ActivatedRoute permet de récupérer un paramètre dans l'url ici l'id
  constructor(private route: ActivatedRoute,private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    // On instencie un book vide temporaire afin de ne pas avoir de page au loading de la page (si jamais la requete est plus longue à s'éxecuter que le chargement de la page)
    this.book = new Book('','');
    //Je récupère l'id dans l'url
    const id = this.route.snapshot.params['id'];
    //Je récupère le livre avec l'id en question en bdd, c'est asynchrone donc .then
    this.booksService.getOneBook(+id).then(
      // @ts-ignore
      (book: Book) => {
        this.book = book;
      }
    );
  }

  return() {
    this.router.navigate(['/books']);
  }

}
