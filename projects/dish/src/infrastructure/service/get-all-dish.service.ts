import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dish.model';



@Injectable({
  providedIn: 'root'
})
export class GetAllDishesService {

  private http = inject(HttpClient);

  execute(): Observable<IDish[]> {
    return this.http.get<IDish[]>(environment.apiUrl + 'dish');
  }
}
