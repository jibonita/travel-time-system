import { PostModel } from './../models/post.model';
import { Injectable } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostsDataService {
  public constructor(private readonly requester: RequesterService) {}

  public getPostsBySearchQuery(search: string): Observable<PostModel[]> {
    return this.requester.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&utf8=&format=json&origin=*`
    );
  }

  public getPostsByTitle(title: string): Observable<PostModel[]> {
    return this.requester.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${title}&origin=*`
    );
  }
}
