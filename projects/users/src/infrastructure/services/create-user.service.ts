import { Injectable } from '@angular/core';
import { IUser } from '../../domain/model/users.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  create(user: IUser): Observable<IUser> {
    return of(user);
  }
}
