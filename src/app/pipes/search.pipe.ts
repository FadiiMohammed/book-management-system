import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interface/book-list';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Book[], searchText: string): any[] {
    return items.filter((item) =>
      item.bookTitle.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
