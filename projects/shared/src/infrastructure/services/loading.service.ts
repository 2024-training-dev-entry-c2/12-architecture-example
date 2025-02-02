import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  setLoading(state: boolean) {
    this._loading.next(state);
  }
}
