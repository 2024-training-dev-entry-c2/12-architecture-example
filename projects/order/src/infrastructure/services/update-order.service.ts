import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import {
  IOrderRequestDTO,
  IOrderResponse,
} from '../../domain/model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateOrderService {
  private http = inject(HttpClient);

  execute(id: number, payload: IOrderRequestDTO): Observable<IOrderResponse> {
    return this.http.put<IOrderResponse>(
      urlResources.orderOperationsById(id),
      payload
    );
  }
}
