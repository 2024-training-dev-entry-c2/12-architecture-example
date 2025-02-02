import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu, IMenuResponse } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(payload: IMenu): Observable<IMenuResponse> {
    return this.http.post<IMenuResponse>(urlResources.menu, payload);
  }
}
