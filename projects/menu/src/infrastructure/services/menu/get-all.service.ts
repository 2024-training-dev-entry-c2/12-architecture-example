import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IMenu } from '../../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.menu;

  execute(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
