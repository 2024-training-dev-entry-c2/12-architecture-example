import { inject, Injectable } from '@angular/core';
import { IPlato } from '../../domain/model/platos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreatePlatoService {
  private readonly _http = inject(HttpClient);

  execute(plato: IPlato): Observable<IPlato> {
    return this._http.post<IPlato>(urlResources.plato.baseUrl, {
      nombre: plato.nombre,
      idMenu: plato.idmenu,
      precio: plato.precio,
      urlImage: plato.urlImage,
    });
  }
}
