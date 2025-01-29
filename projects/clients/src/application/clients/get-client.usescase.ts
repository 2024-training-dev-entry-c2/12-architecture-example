import { inject, Injectable, OnDestroy } from '@angular/core';
import { State } from '../../domain/state';
import { IClients } from '../../domain/model/clients.model';
import { GetClientService } from '../../infrastructure/services/get-client.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetClientUseCase implements OnDestroy {
  private readonly _service = inject(GetClientService);
  private readonly _state = inject(State);
  private destroy$ = new Subject<void>();

  client$(): Observable<IClients[]> {
    return this._state.clients.client.$();
  }

  getClientsSnapshot(): IClients[] {
    return this._state.clients.client.snapshot();
  }

  execute(): void {
    if (this.getClientsSnapshot()?.length) {
      return;
    }

    this._service
      .getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (clients) => {
          this._state.clients.client.set(clients);
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
