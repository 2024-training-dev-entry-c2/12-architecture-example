import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state.factory';
import { BehaviorSubject } from 'rxjs';
import { IAuthResponseDTO } from '../model/auth.response.model';
import { IUserResponseDTO } from '../model/user.response.model';

@Injectable({
  providedIn: 'root',
})
export class UsersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly user$ = new BehaviorSubject<IAuthResponseDTO>(null);
  private readonly userSave$ = new BehaviorSubject<IUserResponseDTO>(null);
  //#endregion

  store() {
    return {
      user: this._factory.state(this.user$),
      userSave: this._factory.state(this.userSave$),
    };
  }
}
