import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishService {
  private http = inject(HttpClient);

  deleteDishById(id: number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este plato?'
    );
    if (confirmed) {
      return this.http.delete<void>(
        urlResources.dishesOperationsById(id.toString())
      );
    } else {
      return new Observable<void>();
    }
  }
}
