import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  selectedFile!: File;
  imagePreview: string = '';
  bookList: any[] | null = [];
  selectedBook: any;

  constructor(private _router: Router, private _booksService: BookService) {}
  saveBookForm: FormGroup = new FormGroup({
    bookTitle: new FormControl('', Validators.required),
    bookAuthor: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
    bookPrice: new FormControl('', Validators.required),
    bookVersion: new FormControl('', Validators.required),
    bookOlderVersion: new FormControl(''),
    bookEdition: new FormControl(''),
    bookISBN: new FormControl('', Validators.required),
    bookReleaseDate: new FormControl(''),
    uploadCover: new FormControl('', Validators.required),
    bookBrief: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const selectedBook = localStorage.getItem('selectedBook');
    if (selectedBook) {
      this.selectedBook = JSON.parse(selectedBook);
      this.populateForm(); // Populate the form inputs
    }
  }

  save(formData: FormGroup) {
    this._booksService.addBook(formData.value);
    this._router.navigate(['/dashboard/bookList']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  populateForm() {
    this.saveBookForm.patchValue({
      bookTitle: this.selectedBook.bookTitle,
      bookAuthor: this.selectedBook.bookAuthor,
      categories: this.selectedBook.categories,
      bookPrice: this.selectedBook.bookPrice,
      bookVersion: this.selectedBook.bookVersion,
      bookOlderVersion: this.selectedBook.bookOlderVersion,
      bookEdition: this.selectedBook.bookEdition,
      bookISBN: this.selectedBook.bookISBN,
      bookReleaseDate: this.selectedBook.bookReleaseDate,
      uploadCover: this.selectedBook.uploadCover,
      bookBrief: this.selectedBook.bookBrief,
    });
  }
  updateBook() {
    const updatedBook = {
      id: this.selectedBook.id,
      bookTitle: this.saveBookForm.value.bookTitle,
      bookAuthor: this.saveBookForm.value.bookAuthor,
      categories: this.saveBookForm.value.categories,
      bookPrice: this.saveBookForm.value.bookPrice,
      bookVersion: this.saveBookForm.value.bookVersion,
      bookOlderVersion: this.saveBookForm.value.bookOlderVersion,
      bookEdition: this.saveBookForm.value.bookEdition,
      bookISBN: this.saveBookForm.value.bookISBN,
      bookReleaseDate: this.saveBookForm.value.bookReleaseDate,
      uploadCover: this.saveBookForm.value.uploadCover,
      bookBrief: this.saveBookForm.value.bookBrief,
    };
    this._booksService.updateBooks(updatedBook);
    localStorage.removeItem('selectedBook');
    this._router.navigate(['/dashboard/bookList']);
  }
  cancel() {
    localStorage.removeItem('selectedBook');
  }
}
