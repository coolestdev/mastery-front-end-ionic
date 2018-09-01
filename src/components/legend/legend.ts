import { Component,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'legend',
  templateUrl: 'legend.html'
})
export class LegendComponent {

  @ViewChild('grid')
  grid:ElementRef;

  constructor() {}

  isSmallType(){
    //console.log("grid length = " + this.grid.nativeElement.offsetWidth);
    if(this.grid.nativeElement.offsetWidth<=320){
        return true;
    }
    return false;
  }

}
