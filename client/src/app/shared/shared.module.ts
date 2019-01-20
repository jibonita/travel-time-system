import { SearchBarComponent } from './search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [МodalComponent, SearchBarComponent],
  imports: [CommonModule],
  exports: [CommonModule, МodalComponent, SearchBarComponent]
})
export class SharedModule {}
