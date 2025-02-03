import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteOrdenService {
  private http = inject(HttpClient);

  deleteOrderById(id: number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta orden?'
    );
    if (confirmed) {
      return this.http.delete<void>(
        urlResources.ordenesOperationsById(id.toString())
      );
    } else {
      return new Observable<void>();
    }
  }
}
