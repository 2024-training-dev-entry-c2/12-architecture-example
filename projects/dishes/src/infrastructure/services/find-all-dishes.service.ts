import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dishes.model';
import { Observable, tap } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class FindAllDishesService {


  http = inject(HttpClient);

  constructor() { }

  execute():Observable<IDish[]>{
    return this.http.get<IDish[]>(urlResources.dishes)
    .pipe(
      tap(console.log)
    );
  }
}
