import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showSubject = new Subject<boolean>();
  show$: Observable<boolean> = this.showSubject.asObservable();

  show(show: boolean): void {
    this.showSubject.next(show);
  }

}