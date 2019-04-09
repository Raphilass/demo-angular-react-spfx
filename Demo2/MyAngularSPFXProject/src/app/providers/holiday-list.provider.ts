import { Injectable } from '@angular/core';
import { sp, Field, ChoiceFieldFormatType, ItemAddResult } from '@pnp/sp';
import { from, Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { IDropdownOption } from 'office-ui-fabric-react';


@Injectable({
    providedIn: 'root'
})
export class HolidayListProviderService {


    private loadingHolidaysSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public loading$:Observable<boolean> = this.loadingHolidaysSubject.asObservable();

    public GetHolidays(listId: string): Observable<IOrderedHolidays> {

        let results: IOrderedHolidays = {
            TodaysHolidays:[],
            UpcomingHolidays: []
        };

        let $select = "Employee/Id,Employee/Title,Employee/Department,Title,Category, EventDate,EndDate, Author/Id,Author/Title";
        let $expand = "Employee/Id,Author/Id";
        let $filter = `EventDate ge '${new Date(new Date().toDateString()).toISOString()}' or EndDate ge '${new Date(new Date().toDateString()).toISOString()}'`
        return from(
            sp.web.lists.getById(listId).items
                .select($select)
                .filter($filter)
                .expand($expand)
                .orderBy("EndDate",false)
                .get()
        ).pipe(
            switchMap((holidays: Array<any>) => {
                holidays.forEach(holiday => {
                    let hol:IHoliday = {
                        Title:holiday.Category,
                        Department:holiday.Employee.Department,
                        DisplayName: holiday.Employee.Title,
                        LineManager: "",
                        NumberOfDays: holiday.NumberOfDays,
                        StartDate:moment(holiday.EventDate).format('LL'),
                        EndDate:moment(holiday.EndDate).format('LL'),
                        Type: holiday.Category
                    }
                    // sort the absence, if an absence has any day which is equal to today show it as current
                    // else add it to upcoming holidays
                    let today:Date = new Date(new Date().toDateString());
                    let sDate:Date = new Date(new Date(holiday.EventDate).toDateString());
                    let eDate:Date = new Date(new Date(holiday.EndDate).toDateString());

                    if (today >= sDate && today <= eDate) {
                        results.TodaysHolidays.push(hol);
                    } else {
                        results.UpcomingHolidays.push(hol);
                    }
                });
                console.log(results);
                this.loadingHolidaysSubject.next(false);
                return from(new Promise(resolve => resolve(results)));
            })
        )
    }

    public getAbsenceTypes(listId: string):Observable<IDropdownOption[]>{

        let $filter:string = "Title eq 'Category'";
        return from (
            sp.web.lists.getById(listId)
            .fields
            .filter($filter)
            .get()
        ).pipe(
            switchMap((field:Field[]) => {
                console.log(field[0]);

                // get the first result
                let choiceField:Field = field[0]
                let results:IDropdownOption[] = [];
                choiceField["Choices"].forEach((choice:string) =>{
                    results.push({
                        key:choice,
                        text:choice,
                        data:choice
                    })
                })
                
                return from(new Promise(resolve => resolve(results)));
            })
        )
    }

    public AddAbsence(listId:string, item:any):Observable<ItemAddResult>{
        return from(
            sp.web.lists
            .getById(listId)
            .items
            .add(item)
        )
    }

}

export interface IHoliday {
    Title: string;
    StartDate: string;
    EndDate: string;
    DisplayName: string;
    NumberOfDays: string;
    Department: string;
    LineManager?: string;
    Type:string;
}

export interface IOrderedHolidays {
    TodaysHolidays: IHoliday[];
    UpcomingHolidays: IHoliday[];
}