import { inject, Injectable } from "@angular/core";
import { UpdateMenuService } from "../../infrastructure/services/update-menu.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { IMenuRequest } from "../../domain/model/menu-request.model";

Injectable({
    providedIn : 'root'
})
export class UpdateMenuUsecase {
    private readonly _service = inject(UpdateMenuService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    menus$(): Observable<IMenu[]>{
        return this._state.menus.menus.$();
    }
    //#endregion

    //#region Public Methods
    execute(id: number, menu: IMenuRequest): void{
        this.subscriptions.add(
            this._service.execute(id.toString(), menu).pipe(
                tap(result=>{
                    const menus = this._state.menus.menus.snapshot()
                    .map( menu => menu.id == id ? result : menu );
                    this._state.menus.menus.set(menus);
                }) 
            ).subscribe()
        )
    }
    //#endregion
}