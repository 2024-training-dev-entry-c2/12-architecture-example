import { inject, Injectable } from '@angular/core';
import { IPedido } from '../../domain/model/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreatePedidoService {
  private readonly _http = inject(HttpClient);

  execute(pedido: IPedido): Observable<IPedido> {
    return this._http.post<IPedido>(urlResources.pedido.baseUrl, pedido);
  }
}
