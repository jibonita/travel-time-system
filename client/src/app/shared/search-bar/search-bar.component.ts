import { SearchService } from './../../core/search.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {
  @Input() public searchPlaceholder = 'Search';
  @Input() public defaultSearch = '';
  @Input() public searchCallback = () => {};

  public constructor(private readonly searchService: SearchService) {}

  public ngOnInit(): void {
    this.searchService.emitSearchInput(this.defaultSearch);
  }

  public search(searchInput: string): void {
    this.searchService.emitSearchInput(searchInput);
    this.searchCallback();
  }
}
