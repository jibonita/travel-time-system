import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class NotificatorService {
  public success(message: string, title?: string): void {
    toastr.success(message, title);
  }

  public error(message: string, title?: string): void {
    toastr.error(message, title);
  }

  public warning(message: string, title?: string): void {
    toastr.warning(message, title);
  }

  public info(message: string, title?: string): void {
    toastr.info(message, title);
  }
}
