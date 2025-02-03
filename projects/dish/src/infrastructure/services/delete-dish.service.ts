import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idish } from '../../domain/model/dish.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class DeleteDishService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<Idish> {
    return this._http.delete<Idish>(
      `${environment.URL_DISH}/borrar/${id}`
    );
  }
}
