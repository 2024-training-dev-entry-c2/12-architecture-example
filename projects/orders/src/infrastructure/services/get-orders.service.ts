import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';

@Injectable({ providedIn: 'root' })
export class GetOrdersService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<Iorder[]> {
    return this._http.get<Iorder[]>('http://localhost:8080/api/orders');
  }
}
