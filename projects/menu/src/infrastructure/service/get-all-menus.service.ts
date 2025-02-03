import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class GetAllMenusService {

  private http = inject(HttpClient);

  execute(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(environment.apiUrl + 'menu');
  }
}
