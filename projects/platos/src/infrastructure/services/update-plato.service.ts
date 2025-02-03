import { inject, Injectable } from '@angular/core';
import { IPlato } from '../../domain/model/platos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdatePlatoService {
  private readonly _http = inject(HttpClient);

  execute(plato: IPlato): Observable<IPlato> {
    return this._http.put<IPlato>(
      urlResources.plato.operationsById(plato.id),
      {
        "nombre": plato.nombre,
        "precio": plato.precio,
        "urlImage": plato.urlImage
      },
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
