import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-list/book-form/book-form.component';
import { HeaderComponent } from './pages/header/header.component';
import {AuthService} from './services/auth.service';
import {BooksService} from './services/books.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Page404Component } from './pages/page404/page404.component';
import {SingleBookComponent} from './pages/book-list/single-book/single-book.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent,
    HeaderComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
