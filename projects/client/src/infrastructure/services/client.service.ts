import { Injectable } from '@angular/core';
import { Iclient } from '../../domain/model/client.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  create(user: Iclient): Observable<Iclient> {
    return of(user);
  }
  constructor() { }
}
