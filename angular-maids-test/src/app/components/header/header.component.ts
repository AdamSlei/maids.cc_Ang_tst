import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(value);
  }
}
