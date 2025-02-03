import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../domain/model/dish.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {
  private http = inject(HttpClient);
  
  execute(id: string, dishRequest: IDish): Observable<IDish> {
    return this.http.put<IDish>(urlResources.dishesOperationsById(id), dishRequest);
  }
}
