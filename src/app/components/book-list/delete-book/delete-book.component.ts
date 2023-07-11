import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
})
export class DeleteBookComponent {
  @Output() delete = new EventEmitter();
  constructor(public activeModal: BsModalRef) {}

  deleteBook() {
    this.delete.emit(true);
  }
}
