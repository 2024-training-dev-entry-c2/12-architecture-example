import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetMenusService {

  private readonly _http = inject(HttpClient); 

  execute(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(urlResources.menu.baseUrl);
  }
}
