import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { МodalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.css']
})
export class PostThumbnailComponent {
  @Input() public title: string;
  @Input() public isHighlighted: boolean;
  @Output() public getPostTitle = new EventEmitter<string>();

  @ViewChild(МodalComponent) public modal: МodalComponent;

  public constructor(private readonly router: Router) {}

  public showPostInfo(): void {
    this.getPostTitle.emit(this.title);
    this.modal.open();
  }

  public showPostDetails(): void {
    this.router.navigate(['/posts', this.title]);
    this.modal.close();
  }
}
