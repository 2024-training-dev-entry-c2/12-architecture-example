import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from '../../../../../shared/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoveOrderService {
  private http = inject(HttpClient);
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${urlResources.order}/delete/${id}`);
  }
}
