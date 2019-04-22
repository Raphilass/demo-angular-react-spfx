import { IDropdownOption } from 'office-ui-fabric-react';

export interface ITextFieldOnChangeResponse{
    ev: React.FormEvent<HTMLInputElement>;
    newValue?:string;
}

export interface IDropDownChangeEvent{
    event: MouseEvent,
    index:number,
    option:IDropdownOption
}

export interface IAbsence{
    Title:string;
    Category:string;
    EventDate:string;
    EndDate:string;
    fAllDayEvent:boolean;
    EmployeeId?: number;
}