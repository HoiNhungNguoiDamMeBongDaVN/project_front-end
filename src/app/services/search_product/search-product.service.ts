import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  constructor() { }

  private dataSubject = new BehaviorSubject<string>('');
  data$ = this.dataSubject.asObservable();

  searchProduct(newData: string) {
    this.dataSubject.next(newData);
  }
}
