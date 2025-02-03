import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteOrdersService {
  private http = inject(HttpClient);

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}orders/${id}`);
  }
}
