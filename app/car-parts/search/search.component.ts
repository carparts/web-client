import { Component, } from '@angular/core';
import {SearchService} from './search.service'
import {SearchResult} from './searchResult'
import {AutoComplete, Password} from 'primeng/primeng';

@Component({
  selector: 'car-search',
  template: `<h1>Search component</h1>
<p-autoComplete [(ngModel)]="fields['make']" [suggestions]="filteredData['make']" (completeMethod)="search($event, 'make')" [dropdown]="true" (onDropdownClick)="handleDropdownClick($event, 'make')" [size]="30"
    [minLength]="1" placeholder="make">
</p-autoComplete>
<p-autoComplete [(ngModel)]="fields['model']" [suggestions]="filteredData['model']" (completeMethod)="search($event, 'model')" [dropdown]="true" (onDropdownClick)="handleDropdownClick($event, 'model')" [size]="30"
    [minLength]="1" placeholder="model">
</p-autoComplete>
<p-autoComplete [(ngModel)]="fields['year']" [suggestions]="filteredData['year']" (completeMethod)="search($event, 'year')" (onDropdownClick)="handleDropdownClick($event, 'year')" [dropdown]="true" [size]="30"
    [minLength]="1" placeholder="year">
</p-autoComplete>`,
  providers: [SearchService]
})

export class SearchComponent {
    fields: {[id:string] : string}
    filteredData : {[id:string]: any[]};

  constructor(private searchService: SearchService) {
    this.fields = {"model":"", "make":"", "year":""};
    this.filteredData = {"model":[], "make":[], "year":[]};
   }

  search(event, field) {
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

 export class SearchComponent2 {
    country: any;
    
    countries: any[];
        
    filteredCountriesSingle: any[];
    
    filteredCountriesMultiple: any[];
    
    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
    
    filteredBrands: any[];
    
    brand: string;
        
    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }
    
    handleDropdownClick() {
        this.filteredBrands = [];
        
        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
    }
 }