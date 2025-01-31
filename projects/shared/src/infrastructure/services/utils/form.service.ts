import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formSubject = new Subject<any>();
  $formData: Observable<any> = this.formSubject.asObservable();

  sendForm(data: any): void {
    this.formSubject.next(data);
  }
}
