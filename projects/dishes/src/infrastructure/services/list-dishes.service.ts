import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDish } from '../../domain/model/dishes.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListDishesService {
  private http = inject(HttpClient);

  getDishes(): Observable<IDish[]> {
    return this.http.get<{ success: boolean; message: string; data: IDish[] }>(`${environment.BASE_URL}dishes`)
      .pipe(
        map(response => response.data)
      );
  }
}
