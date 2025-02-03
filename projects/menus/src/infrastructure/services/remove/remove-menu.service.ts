import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from '../../../../../shared/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemoveMenuService {
  private http = inject(HttpClient);
  deleteMenu(id: number): Observable<any> {
    return this.http.delete<any>(`${urlResources.menu}/delete/${id}`);
  }
}
