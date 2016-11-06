import { Injectable } from '@angular/core';
import {SearchResult} from './searchResult'
import {SEARCH_RESULTS} from './mock-search-results'

@Injectable()
export class SearchService {
  getSearchResults(): Promise<SearchResult[]> {
    return Promise.resolve(SEARCH_RESULTS);
  }
}