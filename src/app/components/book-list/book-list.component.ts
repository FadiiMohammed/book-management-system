import { Component, Renderer2, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/interface/book-list';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: Book[] = [];
  modalRef: BsModalRef | undefined;
  searchValue: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(
    private _bookService: BookService,
    private modalService: BsModalService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.updateBooksList();
  }

  updateBooksList() {
    this.books = this._bookService.getBooks();
  }

  deleteBook(id: string) {
    this.modalRef = this.modalService.show(DeleteBookComponent, {
      class: 'modal-dialog-centered',
    });

    this.modalRef.content.delete.subscribe((res: boolean) => {
      if (res) {
        this._bookService.deleteBook(id);
        this.updateBooksList();
        this.modalRef?.hide();
      }
    });
  }

  editBook(id: string) {
    const selectedBook = this._bookService.getBook(id);
    localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
    this._router.navigate(['/dashboard/addBook']);
  }
  getDisplayedBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.books.slice(startIndex, endIndex);
  }
  onPageChange(pageNumber: any): void {
    this.currentPage = pageNumber.page + 1;
  }
}
