import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  constructor() { }

  private dataSubject = new BehaviorSubject<string>('');
  data$ = this.dataSubject.asObservable();


  private dataSubjectIconLoginLogout = new BehaviorSubject<string>('');
  dataIconLoginLogout$ = this.dataSubjectIconLoginLogout.asObservable();

  searchProduct(newData: string) {
    this.dataSubject.next(newData);
  }

  handleIconLoginLogout(data: any) {
    this.dataSubjectIconLoginLogout.next(data);
  }

}
