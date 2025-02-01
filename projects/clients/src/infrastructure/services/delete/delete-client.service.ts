import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IClient } from '../../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {

  private http = inject(HttpClient);

  execute(id : number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar a este cliente?'
    );
    if (confirmed) {
      return this.http.delete<void>(urlResources.clientsOperationsById(id.toString()));
    } else {
      return new Observable<void>();
    }
  }
}
