import { PostsDataService } from './../services/posts-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {
  public postTitle: string;

  public constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    // the url path parameter
    this.postTitle = this.route.snapshot.params['title'];

    // the data from the resolver
    const post = this.route.snapshot.data['post'];
    console.log(post);
  }
}
