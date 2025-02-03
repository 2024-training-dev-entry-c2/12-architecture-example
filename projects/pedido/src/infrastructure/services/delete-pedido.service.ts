import { inject, Injectable } from '@angular/core';
import { IPedido } from '../../domain/model/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeletePedidoService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<IPedido> {
    return this._http.delete<IPedido>(urlResources.pedido.baseUrl + '/' + id);
  }
}
