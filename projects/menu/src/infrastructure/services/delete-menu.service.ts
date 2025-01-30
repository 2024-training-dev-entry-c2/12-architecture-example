import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {
private baseUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) {}

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
