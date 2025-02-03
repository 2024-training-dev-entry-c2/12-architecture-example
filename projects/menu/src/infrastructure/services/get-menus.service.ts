import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Imenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class GetMenuService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<Imenu[]> {
    return this._http.get<Imenu[]>(`${environment.URL_MENU}`);
  }
}
