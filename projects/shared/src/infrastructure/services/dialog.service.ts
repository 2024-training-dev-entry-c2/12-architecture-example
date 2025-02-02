import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialogMessage = new BehaviorSubject<string>('');
  public dialogMessage$ = this._dialogMessage.asObservable();

  private _status = new BehaviorSubject<'error' | 'success' | null>(null);
  public status$ = this._status.asObservable();

  setDialogMessage(message: string) {
    this._dialogMessage.next(message);
  }

  setDialog(status: 'error' | 'success') {
    this._status.next(status);
  }
}
