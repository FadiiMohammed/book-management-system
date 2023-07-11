import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interface/book-list';
import { BookService } from 'src/app/services/book.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteBookComponent } from '../book-list/delete-book/delete-book.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  id: string | null = '';
  book: Book = {} as Book;
  modalRef: BsModalRef | undefined;
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _booksService: BookService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.book = this._booksService.getBook(this.id);
    }
  }

  deleteBook(id: string) {
    this.modalRef = this.modalService.show(DeleteBookComponent, {
      class: 'modal-dialog-centered',
    });
    this.modalRef.content.delete.subscribe((res: boolean) => {
      if (res) {
        this._booksService.deleteBook(id);
        this.updateBooksList();
        this.modalRef?.hide();
        this._router.navigate(['/dashboard']);
      }
    });
  }

  updateBooksList() {
    this.books = this._booksService.getBooks();
  }

  editBook(id: string) {
    const selectedBook = this._booksService.getBook(id);
    localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
    this._router.navigate(['/dashboard/addBook']);
  }
}
