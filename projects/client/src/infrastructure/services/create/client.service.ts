import { inject, Injectable } from '@angular/core';
import { IClient, IClientRequest } from '../../../domain/model/client.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  addClient(client: IClientRequest): Observable<IClient> {
    return this.http.post<any>('http://localhost:8080/clients', client).pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }

  private validateObjectResponse(response: any): IClient {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.email === 'string' &&
      typeof response.isOften === 'boolean' &&
      Array.isArray(response.orderIds)
    ) {
      return response as IClient;
    } else {
      throw new Error('Invalid client structure');
    }
  }
}
