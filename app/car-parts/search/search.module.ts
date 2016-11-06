import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent }   from './search.component';
import { FormsModule }   from '@angular/forms';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AutoCompleteModule],
  declarations: [ SearchComponent],
  bootstrap:    [ SearchComponent ],
  exports: [SearchComponent]
})
export class SearchModule {
 }