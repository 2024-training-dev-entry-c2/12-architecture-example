import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {

  private http = inject(HttpClient);
  private urlbase = 'http://localhost:8080/api/cliente';

  execute(id: number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar a este cliente?'
    );
    if (confirmed) {
      return this.http.delete<void>(`${this.urlbase}/${id}`);
    } else {
      return new Observable<void>();
    }
  }
}
