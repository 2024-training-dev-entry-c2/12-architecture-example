import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../domain/model/menu.model";
import { State } from "../domain/state";
import { GetByIdMenuService } from "../infrastructure/services/get-by-id-menu.service";

@Injectable({
    providedIn: 'root'
})
export class GetByIdMenuUseCase {
    private readonly _service = inject(GetByIdMenuService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    menu$(): Observable<IMenu> {
        return this._state.menus.OneMenu$.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.getById(id)
                .pipe(
                    tap(menu => {
                        console.log(menu);
                        this._state.menus.OneMenu$.set(menu);
                    })
                )
                .subscribe()
        );
    }
}
