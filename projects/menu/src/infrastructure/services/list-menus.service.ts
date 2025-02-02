import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenuResponse } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ListMenusService {
  private http = inject(HttpClient);

  execute(): Observable<IMenuResponse[]> {
    return this.http.get<IMenuResponse[]>(urlResources.menu + '/active');
  }
}
