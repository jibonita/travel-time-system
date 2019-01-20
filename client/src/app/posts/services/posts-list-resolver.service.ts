import { SearchService } from '../../core/search.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsDataService } from './posts-data.service';
import { flatMap, take } from 'rxjs/operators';

@Injectable()
export class PostsListResolverService implements Resolve<Observable<any>> {
  public constructor(
    private readonly postsService: PostsDataService,
    private readonly searchService: SearchService
  ) {}

  public resolve(): Observable<any> {
    // take only the first emmited search and replace it with the
    // observable that is retuned from the getPostsBySearchQuery
    return this.searchService.searchInput$.pipe(
      take(1),
      flatMap((searchInput: string) =>
        this.postsService.getPostsBySearchQuery(searchInput)
      )
    );
  }
}
