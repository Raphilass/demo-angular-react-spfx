import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PanelType } from 'office-ui-fabric-react';
import { IHoliday } from '../providers/holiday-list.provider';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnChanges {
  
  @Input("ShowPanel") isOpen:boolean;
  @Input("PanelType") panelType:PanelType;
  @Input("Absence") _absence:IHoliday;
  @Output("dismiss") _dismiss:EventEmitter<any> = new EventEmitter();

  showDetail:boolean = false;
  absence:IHoliday = {
    Title:"",
    Department:"",
    DisplayName: "",
    LineManager: "",
    NumberOfDays:"",
    StartDate:"",
    EndDate:"",
    Type: ""
  };  

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change")
     if(changes._absence.currentValue){
      this.absence = changes._absence.currentValue;
     }
  }  

  _handleOnDismiss(ev:any){
    this.showDetail = false;
    this._dismiss.emit();
  }

  


}
