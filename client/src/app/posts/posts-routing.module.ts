import { PostDetailsResolverService } from './services/post-details-resolver.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostsListResolverService } from './services/posts-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsListResolverService }
  },
  {
    path: ':title',
    component: PostDetailsComponent,
    resolve: { post: PostDetailsResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
