import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dishes.model'; 

@Injectable({
  providedIn: 'root'
})
export class DeleteDishService {
  private readonly _http = inject(HttpClient);

  deleteDish(idMenu: number, idDish: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/menus/${idMenu}/dishes/${idDish}`);
  }

}
