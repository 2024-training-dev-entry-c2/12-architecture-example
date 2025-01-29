import { inject, Injectable, OnDestroy } from '@angular/core';
import { GetDishesService } from '../../infrastructure/services/get-dishes.service';
import { State } from '../../domain/state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IDishes } from '../../domain/model/dishes.model';



@Injectable({
  providedIn: 'root',
})
export class GetDishesUseCase implements OnDestroy {
  private readonly _service = inject(GetDishesService);
  private readonly _state = inject(State);
  private destroy$ = new Subject<void>();

  dish$(): Observable<IDishes[]> {
    return this._state.dishes.dish.$();
  }

  getClientsSnapshot(): IDishes[] {
    return this._state.dishes.dish.snapshot();
  }

  execute(): void {
    if (this.getClientsSnapshot()?.length) {
      return;
    }

    this._service
      .getDishes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dishes) => {
          this._state.dishes.dish.set(dishes);
        },
        error: (error) => {
          console.error('Error fetching dishes:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
