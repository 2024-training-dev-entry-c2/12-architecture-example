import { inject, Injectable } from '@angular/core';
import { IUser } from '../../domain/model/users.model';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  private _environmentService: EnvironmentService = inject(EnvironmentService);

  create(user: IUser): Observable<IUser> {
    console.log(this._environmentService.apiUrl + '/users');
    return of(user);
  }
}
