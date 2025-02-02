import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';
import { IDish, IDishResponse } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishService {
  private http = inject(HttpClient);

  execute(id: number, payload: IDish): Observable<IDishResponse> {
    return this.http.put<IDishResponse>(
      urlResources.dishOperationsById(id),
      payload
    );
  }
}
