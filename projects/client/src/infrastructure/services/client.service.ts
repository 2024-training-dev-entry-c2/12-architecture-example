import { inject, Injectable } from '@angular/core';
import { IClient, IClientRequest } from '../../domain/model/client.model';
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

  getClients(): Observable<IClient[]> {
    return this.http.get<any>('http://localhost:8080/clients').pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }
  create(user: IClient): Observable<IClient> {
    return of(user);
  }
  getClientId(id: number): Observable<IClient> {
    return this.http.get<any>(`http://localhost:8080/clients/${id}`).pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/clients/${id}`);
  }
  updateClient(client: IClientRequest, id: number): Observable<IClient> {
    return this.http
      .put<any>(`http://localhost:8080/clients/${id}`, client)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
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
