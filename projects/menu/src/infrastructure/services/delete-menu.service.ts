import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Imenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class DeleteMenuService {
  private readonly _http = inject(HttpClient);

  execute(menuId: number): Observable<Imenu> {
    return this._http.delete<Imenu>(`${environment.URL_MENU}/borrar/${menuId}`);
  }
}
