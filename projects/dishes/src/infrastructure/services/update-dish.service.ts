import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDishRequest } from '../../domain/model/dish-request.model';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {
  private http = inject(HttpClient);
  
  execute(id: string, dishRequest: IDishRequest): Observable<IDish> {
    return this.http.put<IDish>(`/platos/${id}`, dishRequest);
  }
}
