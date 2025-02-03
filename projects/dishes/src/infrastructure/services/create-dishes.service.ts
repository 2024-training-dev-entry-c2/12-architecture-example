import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dishes.model';
import { ICreateDish } from '../../domain/model/create-dishes';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateDishesService {

  http = inject(HttpClient);

  constructor() { }

  execute(menuId: number, body: ICreateDish):Observable<IDish>{
    return this.http.post<IDish>(`${urlResources.dishes}/menu/${menuId}`, body);
  }

}
