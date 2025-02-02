import { inject, Injectable } from '@angular/core';
import { IClient, IClientRequest } from '../../../domain/model/client.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlResources } from '../../../../../shared/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RemoveClientService {

  private http = inject(HttpClient);

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${urlResources.client}/${id}`);
  }

}
