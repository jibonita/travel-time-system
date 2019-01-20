import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class SearchService {
  private readonly searchInputSubject$ = new ReplaySubject<string>(1);

  public get searchInput$(): Observable<string> {
    return this.searchInputSubject$.asObservable();
  }

  public emitSearchInput(searchInput: string): void {
    this.searchInputSubject$.next(searchInput);
  }
}
