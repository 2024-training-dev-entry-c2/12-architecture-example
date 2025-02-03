import { inject, Injectable } from '@angular/core';
import { urlResources } from 'shared';
import { IDish } from '../../domain/model/dishes.model';
import { ICreateDish } from '../../domain/model/create-dishes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishesService {
  http = inject(HttpClient);

  constructor() { }

  execute(id: number, body: ICreateDish):Observable<IDish>{
    return this.http.put<IDish>(`${urlResources.dishes}/${id}`, body);
  }

}
