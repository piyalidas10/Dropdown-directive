import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
