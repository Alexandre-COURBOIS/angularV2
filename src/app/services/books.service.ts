import {Injectable} from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject} from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  //Je créer un array d'objet de type book en fonction du modele qui sera vide par défaut
  books: Book[] = [];
  //Le book subject permet d'emettre l'array Book de base
  bookSubject = new Subject<Book[]>();

  constructor() {
  }

  //Cette method récupère le contenu de l'array Book et l'emet au travers du bookSubject
  emitBooks() {
    this.bookSubject.next(this.books);
  }

  //Enregistre les livres en BDD
  saveBooks() {
    //ici je récupère la db firebase j'indiqque via ref le nom de la "colonne" où je souhaite set mon array Books
    firebase.database().ref('/books').set(this.books);
  }

  //Récupérer les livres en bdd
  getBooks() {
    /* Iici on récupère les books donc leur value (nommé ici data emise sous forme de Snapshot) que je stock dans this.books si il y a une data.val, sinon je retourne
    mon tableau de books vide originel (Permet d'éviter les bugs si la table est vide où ne retourne rien') */
    firebase.database().ref('/books').on('value',(data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  //Retourne un seul livre de la badd, prend donc en paramètre l'id du livre en question
  getOneBook(id: number) {
  return new Promise(
    ((resolve, reject) => {
      firebase.database().ref('books/'+id).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      )
    })
  )
  }
}
