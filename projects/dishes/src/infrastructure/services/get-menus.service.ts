import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetMenusService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(urlResources.menu, { headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
