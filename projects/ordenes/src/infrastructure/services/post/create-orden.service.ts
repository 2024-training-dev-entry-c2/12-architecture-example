import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateOrden } from '../../../domain/model/create-orden.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateOrdenService {
  private http = inject(HttpClient);
  addOrden(ordenes: ICreateOrden): Observable<ICreateOrden> {
    return this.http.post<ICreateOrden>(urlResources.ordenes, ordenes);
  }
}
