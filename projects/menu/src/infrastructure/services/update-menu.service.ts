import { inject, Injectable } from '@angular/core';
import { ICreateMenu } from '../../domain/model/create.menu.model';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  http = inject(HttpClient);

  constructor() { }

  execute(menuId: number, body: ICreateMenu):Observable<IMenu>{
    return this.http.put<IMenu>(`${urlResources.menu}/${menuId}`, body);
  }

}
