import { Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  create(menu: IMenu): Observable<IMenu> {
    return of(menu);
  }
}
