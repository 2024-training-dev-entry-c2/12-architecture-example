import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";
import { Router } from "@angular/router";
import { CreateMenuService } from "../infrastructure/services/create-menu.service";
import { ICreateMenu } from "../domain/model/create.menu.model";


@Injectable({
  providedIn: 'root'
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private router = inject(Router);

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(body: ICreateMenu): void {
    this.subscriptions.add(
      this._service.execute(body)
        .pipe(
          tap((menu) => {
            const menus = this._state.menuState.menu.snapshot();
            this._state.menuState.menu.set([...menus, menu]);
            this.router.navigate(['/dashboard/menu/view']);
          }),
        ).subscribe()
    );
  }

}
