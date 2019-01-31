import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StreetMapComponent } from './street-map/street-map.component';
import { SentenceCasePipe } from '../pipes/sentence-case.pipe';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    МodalComponent,
    SearchBarComponent,
    StreetMapComponent,
    SentenceCasePipe,
    ChartComponent
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    МodalComponent,
    SearchBarComponent,
    StreetMapComponent,
    SentenceCasePipe,
    ChartComponent
  ]
})
export class SharedModule {}
