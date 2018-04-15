import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendComponent } from "./legend";
import { IonicModule } from "ionic-angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    LegendComponent
  ],
  exports:[
    LegendComponent
  ]
})
export class LegendModule {}
