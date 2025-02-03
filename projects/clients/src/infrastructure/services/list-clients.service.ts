import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IClient } from '../../domain/model/clients.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListClientsService {

  private http = inject(HttpClient);

  getClients(): Observable<IClient[]> {
    return this.http.get<{ success: boolean; message: string; data: IClient[] }>(`${environment.BASE_URL}clients`)
    .pipe(
      map(response => response.data)
    );
  }
}
