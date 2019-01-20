import { PostsDataService } from './posts-data.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  Resolve
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';

@Injectable()
export class PostDetailsResolverService implements Resolve<Observable<any>> {
  public constructor(
    private readonly postsService: PostsDataService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}
  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const title = route.params['title'];

    return this.postsService.getPostsByTitle(title).pipe(
      tap((data: any) => {
        // check if there is a post with that title
        // this is how the wikipedia api works
        if (data.query.pages['-1']) {
          this.router.navigate(['/not-found']);
          this.notificator.error('Invalid post!');
        }
      })
    );
  }
}
