import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StreetMapComponent } from './street-map/street-map.component';
import { SentenceCasePipe } from '../pipes/sentence-case.pipe';

@NgModule({
  declarations: [МodalComponent, SearchBarComponent, StreetMapComponent,SentenceCasePipe],
  imports: [CommonModule],
  exports: [CommonModule, МodalComponent, SearchBarComponent, StreetMapComponent, SentenceCasePipe]
})
export class SharedModule {}
