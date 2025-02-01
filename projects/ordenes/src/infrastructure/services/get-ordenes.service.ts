import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IViewOrden } from '../../domain/model/orden.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetOrdenesService {

   private http = inject(HttpClient);

   execute(): Observable<IViewOrden[]> {
    return this.http.get<IViewOrden[]>(urlResources.ordenes);
  }
}
