import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirstComponent }   from './app.first.component';
import { FormsModule }   from '@angular/forms';
import { SearchModule } from './car-parts/search/search.module'

@NgModule({
  imports:      [ BrowserModule, FormsModule, SearchModule],
  declarations: [ FirstComponent],
  bootstrap:    [ FirstComponent ]
})
export class AppModule { }