import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu, IMenuResponse } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private http = inject(HttpClient);

  execute(id: number, payload: IMenu): Observable<IMenuResponse> {
    return this.http.put<IMenuResponse>(
      urlResources.menuOperationsById(id),
      payload
    );
  }
}
