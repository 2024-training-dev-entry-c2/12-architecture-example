import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AlertData {
  message: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertData | null>();
  alert$ = this.alertSubject.asObservable();

  constructor() {}
  showAlert(message: string, type: string) {
    this.alertSubject.next({ message, type });
  }
  closeAlert() {
    this.alertSubject.next(null);
  }
}
