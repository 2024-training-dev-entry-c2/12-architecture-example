import { inject, Injectable } from '@angular/core';
import { SaveUserService } from '../../infrastructure/services/save-user.service';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IUserResponseDTO } from '../../domain/model/user.response.model';
import { IUserRequestDTO } from '../../domain/model/user.request.model';

@Injectable({
  providedIn: 'root',
})
export class SaveUserUseCase {
  private readonly _service = inject(SaveUserService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  userSave$(): Observable<IUserResponseDTO> {
    return this._state.users.userSave.$();
  }

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  
  execute(user: IUserRequestDTO): void {
        this.subscriptions.add(
          this._service.saveUser(user)
            .pipe(
              tap(result => {
                this._state.users.userSave.set(result);
                // const users = this._state.users.user.snapshot();
                // this._state.users.user.set([...users, result])
              })
            )
            .subscribe()
        );
  }
}
