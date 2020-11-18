import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  //Methode pour créer un utilisateur

  createNewUser(email: string, password: string) {
    //Création d'une promise c'est un élèment qu'on attend qui est en pending, c'est asynchrone, donc il faut le traiter tel quel
    return new Promise(
      ((resolve, reject) => {
        // gestion de l'enregistrement d'un utilisateur via firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          });
      })
    );
  }

  //Creation d'une promise permettant la connexion
  signInUser(email: string, password: string) {
    return new Promise(
      ((resolve, reject) => {
        // gestion de la connexion via firebase
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          });
      })
    );
  }

  //Creation d'une methode executant la deconnxion ici ce n'est pas une promise car elle s'effectue sans attente de retour (sans requêtes)
  signOutUser() {
    firebase.auth().signOut();
    sessionStorage.setItem('isLogged','false');
    sessionStorage.clear();
  }

}
