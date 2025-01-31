import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {

  private http = inject(HttpClient);

  execute(client: IClient): Observable<IClient> {
    return this.http.put<IClient>(environment.apiUrl + 'client/' + client.id, client);
  }
}
