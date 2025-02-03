import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Imenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class UpdateMenuService {
  private readonly _http = inject(HttpClient);

  execute(menu: Imenu): Observable<Imenu> {
    return this._http.put<Imenu>(
      `${environment.URL_MENU}/edit/${menu}`,
      menu
    );
  }
}
