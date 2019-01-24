import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StreetMapComponent } from './street-map/street-map.component';

@NgModule({
  declarations: [МodalComponent, SearchBarComponent, StreetMapComponent],
  imports: [CommonModule],
  exports: [CommonModule, МodalComponent, SearchBarComponent, StreetMapComponent]
})
export class SharedModule {}
