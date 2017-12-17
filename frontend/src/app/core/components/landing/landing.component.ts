import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [require('./landing.component.scss')],
  encapsulation: ViewEncapsulation.Emulated
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
