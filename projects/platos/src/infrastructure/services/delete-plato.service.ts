import { inject, Injectable } from '@angular/core';
import { IPlato } from '../../domain/model/platos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeletePlatoService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<IPlato> {
    return this._http.delete<IPlato>(urlResources.plato.baseUrl + '/' + id);
  }
}
