import { Injectable, inject } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { ListMenusService } from "../../infrastructure/services/list-menus.service";

Injectable({
    providedIn : 'root'
})
export class ListMenusUsecase {
    private readonly _service = inject(ListMenusService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    menus$(): Observable<IMenu[]>{
        return this._state.menus.menus.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void{
        this.subscriptions.add(
            this._service.execute().pipe(
                tap( this._state.menus.menus.set )
            ).subscribe()
        );
    }
    //#endregion
}