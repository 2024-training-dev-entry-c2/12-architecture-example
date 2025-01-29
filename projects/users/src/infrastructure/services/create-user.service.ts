import { inject, Injectable } from '@angular/core';
import { IUser } from '../../domain/model/users.model';
import { Observable, of } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  create(user: IUser): Observable<IUser> {
    console.log(environment.apiUrl + '/users');
    return of(user);
  }
}
