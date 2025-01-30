import { inject, Injectable } from "@angular/core";
import { DeleteMenuService } from "../../infrastructure/services/delete-menu.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";

Injectable({
    providedIn : 'root'
})
export class DeleteMenuUsecase {
    private _service = inject(DeleteMenuService);
    private _state = inject(State);
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

    execute(id: number): void{
        this.subscriptions.add(
            this._service.execute(id.toString()).pipe(
                tap(( ) =>{
                    const menus = this._state.menus.menus.snapshot()
                    .filter( menu => menu.id != id );
                    this._state.menus.menus.set(menus);
                })
            ).subscribe()
        );
    }
    //#endregion
}