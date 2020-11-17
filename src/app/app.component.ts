import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAnC21gYPR_cl56EaQRs3V0joqI2GumE-U",
      authDomain: "angularbookproject-1d367.firebaseapp.com",
      databaseURL: "https://angularbookproject-1d367.firebaseio.com",
      projectId: "angularbookproject-1d367",
      storageBucket: "angularbookproject-1d367.appspot.com",
      messagingSenderId: "530599951200",
      appId: "1:530599951200:web:ef388efc431bc5f05abc05"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
