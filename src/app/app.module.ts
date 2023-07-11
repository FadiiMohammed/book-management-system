import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SideMenuComponent } from './layouts/side-menu/side-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteBookComponent } from './components/book-list/delete-book/delete-book.component';
import { SearchPipe } from './pipes/search.pipe';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    AddBookComponent,
    BookDetailsComponent,
    NavbarComponent,
    SideMenuComponent,
    DashboardComponent,
    ViewBookComponent,
    UpdateBookComponent,
    NotFoundComponent,
    DeleteBookComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
