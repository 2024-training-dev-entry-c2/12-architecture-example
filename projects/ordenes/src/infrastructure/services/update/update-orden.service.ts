import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateOrden } from '../../../domain/model/create-orden.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class UpdateOrdenService {
  private http = inject(HttpClient);

  updateOrden(orden: ICreateOrden): Observable<ICreateOrden> {
    return this.http.put<ICreateOrden>(
      urlResources.ordenesOperationsById(orden.id.toString()),
      orden
    );
  }
  updateStatusOrden(id: number, statusOrder: string): Observable<ICreateOrden> {
    return this.http.put<ICreateOrden>(
      `${urlResources.ordenesOperationsById(id.toString())}/${statusOrder}`,
      {}
    );
  }
}
