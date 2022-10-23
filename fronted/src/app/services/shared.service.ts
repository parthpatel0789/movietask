import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  // public searchDataChange = new BehaviorSubject<any>(null);
  // public searchDataChangeValue = this.searchDataChange.asObservable();
  // public clearSearchSubject = new BehaviorSubject<any>(null);
  // public claerSearchValue = this.clearSearchSubject.asObservable();

  // private subject = new BehaviorSubject<any>(null);

  // constructor() { }
  // searchData(data) {
  //   this.searchDataChange.next(data ? data : false);
  // }

  // clearSearch() {
  //   this.clearSearchSubject.next(true);
  // }
}
