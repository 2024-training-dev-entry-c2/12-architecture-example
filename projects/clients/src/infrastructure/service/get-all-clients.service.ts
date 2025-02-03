import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class GetAllClientsService {

  private http = inject(HttpClient);

  execute(): Observable<IClient[]> {
    return this.http.get<IClient[]>(environment.apiUrl + 'client');
  }
}
