import { Injectable } from '@angular/core';
import { Book } from '../interface/book-list';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  getBooks() {
    const books = localStorage.getItem('bookData');
    return books ? JSON.parse(books) : null;
  }

  getBook(id: string) {
    const books = this.getBooks();
    return books.length ? books.find((book: any) => book.id === id) : null;
  }

  deleteBook(id: string) {
    const books = this.getBooks();
    const updatedBooks = books.filter((book: any) => book.id !== id);
    this.addBooks(updatedBooks);
  }

  addBook(book: Book) {
    const id = `book${Math.floor(Math.random() * 1000000)}`;
    book.id = id;
    const bookList = this.getBooks() ? this.getBooks() : [];
    bookList?.unshift(book);
    this.addBooks(bookList);
  }

  addBooks(books: Book[]) {
    localStorage.setItem('bookData', JSON.stringify(books));
  }

  updateBooks(newBook: Book) {
    const books = this.getBooks();
    const updatedBooks = books.map((book: Book) => {
      if (book.id === newBook.id) {
        return newBook;
      }
      return book;
    });
    this.addBooks(updatedBooks);
  }
}
