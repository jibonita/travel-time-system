import { Subscription } from 'rxjs';
import { SearchService } from './../../core/search.service';
import { PostsDataService } from './../services/posts-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {
  public postsTitles: string[] = [];
  public highlightedPostTitle: string;

  private searchSubscription: Subscription;

  public constructor(
    private readonly postsService: PostsDataService,
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService
  ) {}

  public ngOnInit(): void {
    const data = this.route.snapshot.data['posts'];
    this.extractPostTitles(data);

    // skip the first emitted search, because the route resolver do it for us
    this.searchSubscription = this.searchService.searchInput$
      .pipe(skip(1))
      .subscribe((searchInput: string) => this.getPosts(searchInput));
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public highlightPost(postTitle: string): void {
    this.highlightedPostTitle = postTitle;
  }

  private getPosts(search: string): void {
    this.postsService
      .getPostsBySearchQuery(search)
      .subscribe(data => this.extractPostTitles(data));
  }

  private extractPostTitles(data: any): void {
    this.postsTitles = data.query ? data.query.search.map(x => x.title) : [];
  }
}
