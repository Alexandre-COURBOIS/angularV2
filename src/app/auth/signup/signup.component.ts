import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  //FormGroup = permet de gérer tout les évenements d'un formulaire
  signupForm !: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      // Les paramètres utilisateurs sont à placer ici (ceux présent dans le model) :
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      passwordVerif: ['', [Validators.required, Validators.min(8)]]
    });
  }

  //Cette methode soumet le formulaire
  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.get('password')?.value === this.signupForm.get('passwordVerif')?.value) {
        //Je recupère la saisis de l'utilisateur
        const email = this.signupForm.get('email')?.value;
        const password = this.signupForm.get('password')?.value;
        //Ici je passe le mail et le password saisis par l'user je peux utiliser .then car c'est une méthode Asynchrone et je redirige vers la route /books
        this.authService.createNewUser(email, password).then(
          () => {
            this.router.navigate(['/books']);
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      } else {
        this.errorMessage = "Vos mot de passe ne correspondent pas";
      }
    } else {
      this.errorMessage = "Merci de renseigner correctement le formulaire";
    }
  }
}
