import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class МodalComponent {
  @ViewChild('content') public modalContent: ElementRef;

  public constructor(private readonly modalService: NgbModal) {}

  public open(): void {
    this.modalService.open(this.modalContent);
  }

  public close(): void {
    this.modalService.dismissAll();
  }
}
