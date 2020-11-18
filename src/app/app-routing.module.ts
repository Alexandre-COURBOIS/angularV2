import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookFormComponent} from './book-list/book-form/book-form.component';
import {SingleBookComponent} from './book-list/single-book/single-book.component';
import {AuthGuardService} from './services/auth-guard.service';
import {Page404Component} from './page404/page404.component';

/*Ici je créer mes routes*/
// et j'y met ma guard dans canActivate
const routes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
  /*Cette route me permet de faire passer un paramètre (ici l'id)*/
  {path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
  /*Le fait d'indiquer un path vide créer un problème, il faut rajouter un pathMatch : full
  afin de lui faire comprendre que c'est uniquement que si c'est le path vide et non pas d'autre path lié à celui-ci*/
  {path: '404NotFound', component: Page404Component},
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: '**', redirectTo: '404NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
