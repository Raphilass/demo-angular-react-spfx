import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-angular-sample-web-part',
  templateUrl: './angular-sample-web-part.component.html',
  styleUrls: ['./angular-sample-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AngularSampleWebPartComponent implements OnInit, AfterViewInit {

  // Input Variables for Angular Element
  @Input("description") description: string;


  constructor() {
    // set locale
    moment.locale("en-GB")
  }


  ngOnInit() {
    
  }

  ngAfterViewInit(): void {

  }

}
