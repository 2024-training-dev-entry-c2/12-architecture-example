import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class DeleteOrdersService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<Iorder> {
    return this._http.delete<Iorder>(
      `${environment.URL_ORDERS}/borrar/${id}`
    );
  }
}
