import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';
import { IDishResponse } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class ListDishesService {
  private http = inject(HttpClient);

  execute(menuId: number): Observable<IDishResponse[]> {
    return this.http.get<IDishResponse[]>(
      urlResources.dish + '/menu/' + menuId
    );
  }
}
