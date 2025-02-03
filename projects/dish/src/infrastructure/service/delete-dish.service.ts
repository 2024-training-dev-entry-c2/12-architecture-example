import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dish.model';



@Injectable({
  providedIn: 'root'
})
export class DeleteDishService {

  private http = inject(HttpClient);

  delete(id: number): Observable<IDish[]> {
    return this.http.delete<IDish[]>(environment.apiUrl + 'dish/'+ id);
  }
}
