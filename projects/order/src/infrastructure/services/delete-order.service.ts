import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderService {
  private readonly _http = inject(HttpClient);

  deleteOrder(id: number): Observable<void> {
    return this._http.delete<void>(environment.apiUrl + `/orders/${id}`);
  }
}
