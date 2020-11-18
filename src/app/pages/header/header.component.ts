import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  // paramètre gérant le statue de connexion
  isAuth!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    //Ici firebase nous retourne un utilisateur
    firebase.auth().onAuthStateChanged(
      //J'indique que ce sera un utilisateur
      (user) => {
        // si il y a une user je set isAuth à true, sinon false
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onsignOut() {
    // Appel de la méthode signOutUser présente dans le auth.service.ts
    this.authService.signOutUser();
  }

}
