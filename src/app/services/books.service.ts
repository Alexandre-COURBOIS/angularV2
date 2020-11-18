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
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  //Retourne un seul livre de la bdd, prend donc en paramètre l'id du livre en question
  getOneBook(id: number) {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref('books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      })
    );
  }

  //Créer un nouveau livre
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // Supprimer un livre
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      // @ts-ignore
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  //Upload de fichiers
  uploadFile(file: File) {
    return new Promise(
      ((resolve, reject) => {
        let res1 = Math.floor(Math.random() * 1000) + 1;
        let res2 = Math.floor(Math.random() * 500) + 1;
        let total = res1 + res2;
        const uniqueFileName = Date.now().toString() + total;
        // ref() sans arguments renvoit à la racine du stockage
        const upload = firebase.storage().ref().child('images/' + uniqueFileName + file.name).put(file);
        //Ici je réagis à chaque changement d'état du téléchargement
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            console.log('chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                console.log('Upload successful ! ('+downloadUrl+')');
                resolve(downloadUrl);
              }
            ));
          }
        );
      })
    );
  }
}
