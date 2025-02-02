import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRestaurant } from '../../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private http = inject(HttpClient)


    execute(restaurantId: number): Observable<IRestaurant> {
        return this.http.get<IRestaurant>(urlResources.restautantOperationsById(restaurantId.toString()));
      }
}
