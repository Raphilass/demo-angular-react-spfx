import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector  } from '@angular/core'
import { createCustomElement } from '@angular/elements';

import { AngularSampleWebPartComponent } from './angular-sample-web-part/angular-sample-web-part.component';


@NgModule({
  declarations: [
    AngularSampleWebPartComponent
  ],
  imports: [
    BrowserModule
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
