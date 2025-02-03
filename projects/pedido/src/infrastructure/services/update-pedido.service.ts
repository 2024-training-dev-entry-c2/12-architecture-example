import { inject, Injectable } from '@angular/core';
import { IPedido } from '../../domain/model/pedido.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdatePedidoService {
  private readonly _http = inject(HttpClient);

  execute(pedido: IPedido): Observable<IPedido> {
    return this._http.put<IPedido>(
      urlResources.pedido.operationsById(pedido.id),
      pedido,
      {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
