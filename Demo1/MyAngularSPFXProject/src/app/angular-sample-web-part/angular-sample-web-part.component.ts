import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { sp } from '@pnp/sp';

@Component({
  selector: 'app-angular-sample-web-part',
  templateUrl: './angular-sample-web-part.component.html',
  styleUrls: ['./angular-sample-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AngularSampleWebPartComponent implements OnInit, AfterViewInit {

  // Input Variables for Angular Element
  @Input("description") description: string;
  @Input('siteurl') siteUrl: string;


  constructor() {
    // set locale
    moment.locale("en-GB")
  }

  lists:any[];

  ngOnInit() {
    sp.web.lists.get().then(lists =>{
      if(lists.length > 0){
        this.lists = lists
      } else {
        this.lists.push('No Lists found ont his site.')
      }
    })
  }

  ngAfterViewInit(): void {
    sp.setup({
      sp: {
        headers: {
          'Pragma': 'no-cache',
          'Cache-control': 'no-cache'
        },
        baseUrl: this.siteUrl
      },
      globalCacheDisable: true
    })
  }

}
