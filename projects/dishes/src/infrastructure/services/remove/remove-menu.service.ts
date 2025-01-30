import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoveMenuService {
  private http = inject(HttpClient);
  deleteDish(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/dishfoods/${id}`);
  }
}
