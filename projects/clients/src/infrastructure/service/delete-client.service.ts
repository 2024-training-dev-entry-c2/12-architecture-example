import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {

  private http = inject(HttpClient);

  delete(id: number): Observable<IClient[]> {
    return this.http.delete<IClient[]>(environment.apiUrl + 'client/'+ id);
  }
}
