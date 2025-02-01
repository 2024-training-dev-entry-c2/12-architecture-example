import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Imenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetMenuService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<Imenu[]> {
    return this._http.get<Imenu[]>('http://localhost:8080/api/menu');
  }
}
