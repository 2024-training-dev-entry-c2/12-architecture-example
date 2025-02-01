import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRestaurant } from '../../domain/model/restaurant.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private http = inject(HttpClient);

  execute(restaurantId: number): Observable<IRestaurant> {
      return this.http.get<IRestaurant>(urlResources.restautantOperationsById(restaurantId.toString()));
    }

}
