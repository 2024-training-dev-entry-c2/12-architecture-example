import { inject, Injectable } from '@angular/core';
import { GetService } from '../../infrastructure/services/get.service';
import { State } from '../../domain/state';
import { DialogService, LoadingService } from 'shared';
import { finalize, Observable, Subscription, tap } from 'rxjs';
import { IUser } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetUseCase {
  private readonly _service = inject(GetService);
  private readonly _state = inject(State);
  private readonly _loading = inject(LoadingService);
  private readonly _dialog = inject(DialogService);
  private subscriptions: Subscription;

  admins$(): Observable<IUser[]> {
    return this._state.admins.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute() {
    this._loading.setLoading(true);
    this.subscriptions.add(
      this._service
        .get()
        .pipe(finalize(() => this._loading.setLoading(false)))
        .pipe(
          tap((admins) => {
            this._state.admins.set(admins);
          })
        )
        .subscribe({
          error: () => {
            this._dialog.setDialogMessage('Get admins error');
            this._dialog.setDialog('error');
          },
        })
    );
  }
}
