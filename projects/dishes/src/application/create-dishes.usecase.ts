import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";
import { Router } from "@angular/router";
import { CreateDishesService } from "../infrastructure/services/create-dishes.service";
import { ICreateDish } from "../domain/model/create-dishes";


@Injectable({
  providedIn: 'root'
})
export class CreateDishesUseCase {
  private readonly _service = inject(CreateDishesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private router = inject(Router);

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menuId: number, body: ICreateDish): void {
    this.subscriptions.add(
      this._service.execute(menuId,body)
        .pipe(
          tap((dish) => {
            const dishes = this._state.dishesState.dishes.snapshot();
            this._state.dishesState.dishes.set([...dishes, dish]);
            this.router.navigate(['/dashboard/menu/view']);
          }),
        ).subscribe()
    );
  }

}
