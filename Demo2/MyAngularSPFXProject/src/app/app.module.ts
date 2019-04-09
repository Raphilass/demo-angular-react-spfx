// import { BrowserModule } from '@angular/platform-browser';
import { AngularReactBrowserModule } from '@angular-react/core'
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule} from '@angular/forms';

import { AngularSampleWebPartComponent } from './angular-sample-web-part/angular-sample-web-part.component';

import { FabIconModule, FabButtonModule, FabFabricModule, FabPanelModule, FabTextFieldModule, FabDatePickerModule, FabDropdownModule } from '@angular-react/fabric';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { AddHolidayPanelComponent } from './add-holiday-panel/add-holiday-panel.component'

@NgModule({
  declarations: [
    AngularSampleWebPartComponent,
    InfoPanelComponent,
    AddHolidayPanelComponent
  ],
  imports: [
    AngularReactBrowserModule,
    FormsModule,
    FabIconModule,
    FabButtonModule,
    FabFabricModule,
    FabPanelModule,
    FabTextFieldModule,
    FabDatePickerModule,
    FabDropdownModule
  ],
  providers: [],
  entryComponents: [AngularSampleWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AngularSampleWebPartComponent, { injector: this.injector });
    customElements.define('app-angular-sample-web-part', el);
  }
}
