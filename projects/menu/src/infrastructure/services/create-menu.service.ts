import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { ICreateMenu } from '../../domain/model/create.menu.model';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  http = inject(HttpClient);

  constructor() { }

  execute(body: ICreateMenu): Observable<IMenu>{
    return this.http.post<IMenu>(urlResources.menu, body);
  }


}
