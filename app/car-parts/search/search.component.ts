import { Component, } from '@angular/core';
import {SearchService} from './search.service'
import {SearchResult} from './searchResult'
import {AutoComplete, Password} from 'primeng/primeng';

@Component({
  selector: 'car-search',
  template: `<h1>Search component</h1>
  <span *ngFor="let field of fieldsArray">
    <p-autoComplete [(ngModel)]="fields[field]" [suggestions]="filteredData[field]" (completeMethod)="search($event, field)" [dropdown]="true" (onDropdownClick)="handleDropdownClick($event, field)" [size]="30"
      [minLength]="1" placeholder="{{field}}"></p-autoComplete>
  </span>
`,
  providers: [SearchService]
})

export class SearchComponent {
    fields: {[id:string] : string}
    filteredData : {[id:string]: string[]};
    fieldsArray : string[];

  constructor(private searchService: SearchService) {
    this.fieldsArray = ["make","model","year"];
    this.fields = {};
    this.filteredData = {};
    this.fieldsArray.map( field => {
        this.fields[field] = "";
        this.filteredData[field] = [];
    });
   }

  search(event, field) {
    this.fieldsArray.map( field => {
        this.filteredData[field] = [];
    });
    this.searchService.getSearchResults().then(results => {
      let filteredRows = results.filter(
        row => {
          for(var a in this.fields) {
          let value = field == a ? event.query : this.fields[a];
          if(row[a].toLowerCase().indexOf(value.toLowerCase()) != 0) {
            return false;
          }
        }
        return true;
      }
    );

    filteredRows.map(row => {
        for(field in this.fields) {
          if(this.filteredData[field].indexOf(row[field]) == -1) { 
            this.filteredData[field].push(row[field]);
          }
        }
      });
    });
  }

    handleDropdownClick(event, field) {
        this.filteredData[field] = [];
        event.query = "";
        this.search(event, field);
        //mimic remote call
        setTimeout(() => {
            this.filteredData[field].push("");
        }, 100)
    }
}