import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  //signinForm = permet de gérer tout les évenements d'un formulaire
  signinForm !: FormGroup;
  // Gestion du message d'erreur
  errorMessage !: String;

  // FormBuilder permet de créer les formulaire, authservice pour l'authentification, le router pour gérer les redirections.
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  // Fonction à utiliser à partir du moment on ou implement OnInit sur sa classe, tout se trouvant dans cette methode s'execute à l'appel de la classe.
  ngOnInit() {
    // J'initialise le formulaire
    this.initForm();
  }

  //Cette methode initialise le formulaire
  initForm() {
    //Ici je génère le form group à l'aide du builder et je le store dans signUpForm
    this.signinForm = this.formBuilder.group({
      // Les paramètres utilisateurs sont à placer ici (ceux présent dans le model) :
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }

  //Cette methode soumet le formulaire
  onSubmit() {
    if (this.signinForm.valid) {
        //Je recupère la saisis de l'utilisateur
        const email = this.signinForm.get('email')?.value;
        const password = this.signinForm.get('password')?.value;
        /* Ici je passe le mail et le password saisis par l'user je peux utiliser .then car c'est une méthode Asynchrone (j'attends donc une réponse)
          et je redirige vers la route /books */
        this.authService.signInUser(email, password).then(
          () => {
            this.router.navigate(['/books']);
            sessionStorage.setItem('isLogged', "true");
            sessionStorage.setItem('email', email);
          },
          (error) => {
            this.errorMessage = error;
          }
        );
    } else {
      this.errorMessage = "Merci de renseigner correctement le formulaire";
    }
  }
}
