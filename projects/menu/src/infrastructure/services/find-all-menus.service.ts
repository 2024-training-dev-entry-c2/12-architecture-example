import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { urlResources } from 'shared';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class FindAllMenusService {

  http = inject(HttpClient);

  constructor() { }

  execute():Observable<IMenu[]>{
    return this.http.get<IMenu[]>(urlResources.menu)
    .pipe(
      tap(console.log)
    );
  }

}
