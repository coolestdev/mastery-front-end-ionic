import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'legend',
  templateUrl: 'legend.html'
})
export class LegendComponent {

  constructor(private platform: Platform) {}

  isSmallType(){
    if(this.platform.width()<=320){
        return true;
    }
    return false;
  }

}
