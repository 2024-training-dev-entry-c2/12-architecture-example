import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';
import { IMenu } from '../../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
 private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.menu;

  execute(menuId: number, menu: IMenu): Observable<IResponse> {
    return this.http.put<IResponse>(this.apiUrl + '/' + menuId, menu, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
