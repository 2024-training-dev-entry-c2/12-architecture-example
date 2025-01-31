import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {

  private http = inject(HttpClient);

  delete(id: number): Observable<IMenu[]> {
    return this.http.delete<IMenu[]>(environment.apiUrl + 'menu/'+ id);
  }
}
