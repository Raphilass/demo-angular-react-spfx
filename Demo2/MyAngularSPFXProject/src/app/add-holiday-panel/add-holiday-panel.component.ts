import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PanelType, ITextFieldState, IRenderFunction, IPanelProps, IDropdownOption } from 'office-ui-fabric-react';
import { FabTextFieldComponent, FabPrimaryButtonComponent, FabPanelComponent } from '@angular-react/fabric';
import { ITextFieldOnChangeResponse, IDropDownChangeEvent, IAbsence } from '../models/interfaces';
import * as moment from 'moment';
import { HolidayListProviderService } from '../providers/holiday-list.provider';
import { ItemAddResult } from '@pnp/sp';

@Component({
  selector: 'app-add-holiday-panel',
  templateUrl: './add-holiday-panel.component.html',
  styleUrls: ['./add-holiday-panel.component.scss']
})
export class AddHolidayPanelComponent implements AfterViewInit, OnInit {

  @Input("ShowPanel") isOpen: boolean;
  @Input("PanelType") panelType: PanelType;
  @Input("ListID") _listId:string
  @Output("dismiss") _dismiss: EventEmitter<any> = new EventEmitter();

  @ViewChild("reasonTextField") private _reasonTextField: FabTextFieldComponent;

  reason: string = "";
  type:string = "";
  startDate:Date;
  endDate:Date;

  _controlRequiredValidation:any = {
    reason:false,
    type:false,
    start:false,
    end:false
  }
  _disabled:boolean = true;
  _absences:IDropdownOption[] = []

  constructor(private absenceProvider:HolidayListProviderService){

  }

  ngOnInit(): void {
    this.absenceProvider.getAbsenceTypes(this._listId).subscribe(response => {
      this._absences = response;
    })
  }

  ngAfterViewInit(): void {
    if (this._reasonTextField) {
      this._reasonTextField.getErrorMessage = this._handleValidateReasonTextField.bind(this);
    }
  }

  _handleOnDismiss(ev: any) {
    this._dismiss.emit();
  }

  _handleReasonChange(response: ITextFieldOnChangeResponse) {
    this.reason = response.newValue;
  }

  _handleValidateReasonTextField(value: any) {
    if (this._reasonTextField.required && value.length == 0) {
      this._controlRequiredValidation.reason = false;
      this._disabled = this._validateForm();
      return `Reason is a required field please enter a value`
    } else {
      this._controlRequiredValidation.reason = true;
      this._disabled = this._validateForm();
      return ``
    }
  }  

  _handleSelectEndDate(dt:Date){
    this.endDate = dt;
    if(dt){
      this._controlRequiredValidation.end = true;
      this._disabled = this._validateForm();
    }   
  }

  _handleSelectStartDate(dt:Date){
    this.startDate = dt;
    if(dt){
      this._controlRequiredValidation.start = true;
      this._disabled = this._validateForm();
    }  
  }

  _onSelectedAbsenceChanged(ev:IDropDownChangeEvent){
    this.type = ev.option.text;
    if(ev.option.text.length > 0){
      this._controlRequiredValidation.type = true;
      this._disabled = this._validateForm();
    }    
  }

  _validateForm(){
    if(this._controlRequiredValidation.reason && 
      this._controlRequiredValidation.type && 
      this._controlRequiredValidation.start && 
      this._controlRequiredValidation.end){
        return false;
      } else {
        return true;
      }
  }

  _handleCancelForm(){
    this._handleOnDismiss(undefined);

    // reset all the controls.
    this._resetForm();
  }

  _handleAddAbsence(){
    console.log(this.endDate)
    console.log(this.startDate)
    let item:IAbsence = {
      Title:this.reason,
      Category:this.type,
      EndDate:moment(this.endDate).toISOString(),
      EventDate:moment(this.startDate).toISOString()
    }
    this.absenceProvider.AddAbsence(this._listId,item)
    .subscribe((response:ItemAddResult) =>{
      // reset form
      this._resetForm();

      // dismiss form
      this._handleOnDismiss(undefined);

      //update main controls.


    })
  }

  private _resetForm(){
    this.reason = "";
    this.type = "";
    this.startDate = undefined;
    this.endDate = undefined;
  }

}
