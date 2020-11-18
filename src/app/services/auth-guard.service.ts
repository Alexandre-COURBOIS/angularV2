import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

//Cette guard s'implemente dans les routes
//Cette class est Asynchrone elle retournera donc une promise
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  // @ts-ignore
  //Ici la méthode can Activate retournera un boolean soit sous forme d'observable ou Promise
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    //Ici on retourne une promise, nous somme donc dans l'attente d'une réponse
    return new Promise(
      ((resolve, reject) => {
        //Si l'utilisateur est connecté il peut aller sur les routes, sinon il est redirigé vers le login
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      })
    );
  }
}
