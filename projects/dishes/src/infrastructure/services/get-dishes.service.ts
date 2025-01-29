import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDishes } from '../../domain/model/dishes.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDishesService {

  private apiUrl = 'http://localhost:8080/api/dishes';
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = this.apiUrl; 

  getDishes(): Observable<IDishes[]> {
    return this._http.get<IDishes[]>(`${this.baseUrl}`);
  }

  // getClientById(id: number): Observable<IClients> {
  //   return this._http.get<IClients>(`${this.baseUrl}/${id}`);
  // }
}
