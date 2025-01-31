import { Injectable } from '@angular/core';
import { IUser } from '../../domain/model/users.model';
import { Observable, of } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  create(user: IUser): Observable<IUser> {
    console.log(urlResources.customer);
    return of(user);
  }
}
