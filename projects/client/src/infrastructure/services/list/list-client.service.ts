import { inject, Injectable } from '@angular/core';
import { IClient, IClientRequest } from '../../../domain/model/client.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlResources } from '../../../../../shared/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListClientService {
  private http = inject(HttpClient);

  getClients(): Observable<IClient[]> {
    return this.http.get<any>(urlResources.client).pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }

  private validateResponse(response: any): IClient[] {
    if (Array.isArray(response)) {
      return response.map((client) => {
        if (
          typeof client.id === 'number' &&
          typeof client.name === 'string' &&
          typeof client.email === 'string' &&
          typeof client.isOften === 'boolean' &&
          Array.isArray(client.orderIds)
        ) {
          return client as IClient;
        } else {
          throw new Error('Invalid client structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
}
