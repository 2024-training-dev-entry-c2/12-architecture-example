import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableEventsService {
  private eventSubject = new Subject<{ event: string; value: any }>();
  event$: Observable<{ event: string; value: any }> = this.eventSubject.asObservable();

  emitEvent(event: string, value: any): void {
    this.eventSubject.next({ event, value });
  }

}
