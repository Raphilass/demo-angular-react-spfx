import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { sp } from '@pnp/sp'
import { Observable } from 'rxjs';
import { HolidayListProviderService, IHoliday, IOrderedHolidays } from '../providers/holiday-list.provider';
import * as moment from 'moment';
import { IIconProps, IButtonStyles, PanelType } from 'office-ui-fabric-react';

@Component({
  selector: 'app-angular-sample-web-part',
  templateUrl: './angular-sample-web-part.component.html',
  styleUrls: ['./angular-sample-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AngularSampleWebPartComponent implements OnInit, AfterViewInit {
 
  @Input("list-name") listId: string;
  @Input("number-of-records") numberOfRecords: number;
  @Input("return-whose-records") whichRecords: number;
  @Input() siteurl: string;

  _showPanel:boolean = false;
  _showAddPanel:boolean = false;
  _passAbsence:IHoliday;
  _panelType:PanelType = PanelType.medium;

  _loading:boolean = false;

  addIconProps:IIconProps = {
    iconName:"CircleAdditionSolid"
  }

  addIconStyles:IButtonStyles = {
    root:{
      color:'#ffffff',
      height: '32px',
      width: '32px'
    }   ,
    rootHovered:{
      color:"#deecf9"
    },
    icon:{
      fontSize:'32px'
    }
  }

  holidays:IOrderedHolidays;

  _handleShowPane(holiday:IHoliday){
    this._showPanel = true;
    this._passAbsence = holiday;
  }

  _handleOnAddPanelDismiss(){
    this.holidayProvider.GetHolidays(this.listId).subscribe(response =>{
      this.holidays = response;
    })
    this._showAddPanel = false;
  }

  _handleOnPanelDismiss(){
    this._showPanel = false;
    this._passAbsence = undefined;
  }

  _addAbsence(){
    this._showAddPanel = true;
  }

  constructor(private holidayProvider:HolidayListProviderService) { 
    if (window.location.href.indexOf("localhost") > -1) {
     
      // set the properties for testing
       this.siteurl = "http://localhost:8080"
      this.listId = "02E98350-7FDA-4750-A558-1CF5F4CC9A02";
      this.numberOfRecords = 10;
      this.whichRecords = 2

      // set locale
      moment.locale("en-GB")

    }
  }
  
  lists:any[];

  ngOnInit() {
    // subscribe to loading
    this.holidayProvider.loading$.subscribe(response =>{
      console.log(response);
      this._loading = response;
    })
    // get the items on the list
    this.holidayProvider.GetHolidays(this.listId).subscribe(response =>{
      this.holidays = response;
    })
    console.log("loading 2 ", this._loading)
  } 
  
  ngAfterViewInit(): void {
    sp.setup({
      sp: {
       headers: {
         'Pragma': 'no-cache',
         'Cache-control': 'no-cache'
       },
       baseUrl: this.siteurl
      },
      globalCacheDisable: true
     })
  }

  truncateDetail(holiday:IHoliday,length:number){
    let detail:string = holiday.Department ? `${holiday.DisplayName}, ${holiday.Department}` : holiday.DisplayName
    return detail.length > length ? `${detail.substr(0,length)}...`: detail;
  }

}
