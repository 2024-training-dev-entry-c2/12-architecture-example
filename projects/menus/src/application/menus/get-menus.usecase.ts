import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subject, takeUntil } from "rxjs";
import { GetMenusService } from "../../infrastructure/services/get-menus.service";
import { IMenu } from "../../domain/model/menus.model";

@Injectable({
  providedIn: 'root',
})
export class GetMenusUseCase{
  private readonly _service = inject(GetMenusService);
  private readonly _state = inject(State);
  private destroy$ = new Subject<void>();

  menu$(): Observable<IMenu[]> {
    return this._state.menus.menu.$();
  }

  getOrdersSnapshot(): IMenu[] {
    return this._state.menus.menu.snapshot();
  }

  execute(): void {
    if (this.getOrdersSnapshot()?.length) {
      return;
    }

    this._service
      .getMenus()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (menus) => {
          this._state.menus.menu.set(menus);
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
