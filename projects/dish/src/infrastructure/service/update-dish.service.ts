import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dish.model';



@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {

  private http = inject(HttpClient);

  execute(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(environment.apiUrl + 'dish/' + dish.id, dish);
  }
}
