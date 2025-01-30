import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {
  private http = inject(HttpClient);

  execute(id: string): Observable<void> {
    return this.http.delete<void>(`/menus/${id}`);
  }
}
