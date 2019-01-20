import { PostDetailsResolverService } from './services/post-details-resolver.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostThumbnailComponent } from './post-thumbnail/post-thumbnail.component';
import { NgModule } from '@angular/core';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsListResolverService } from './services/posts-list-resolver.service';
import { PostsDataService } from './services/posts-data.service';

@NgModule({
  declarations: [
    PostsListComponent,
    PostThumbnailComponent,
    PostDetailsComponent
  ],
  imports: [SharedModule, PostsRoutingModule],
  providers: [
    PostDetailsResolverService,
    PostsListResolverService,
    PostsDataService
  ]
})
export class PostsModule {}
