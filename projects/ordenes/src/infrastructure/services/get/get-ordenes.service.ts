import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { ICreateOrden } from '../../../domain/model/create-orden.model';

@Injectable({
  providedIn: 'root',
})
export class GetOrdenesService {
  private http = inject(HttpClient);

  execute(): Observable<ICreateOrden[]> {
    return this.http.get<ICreateOrden[]>(urlResources.ordenes);
  }
}
