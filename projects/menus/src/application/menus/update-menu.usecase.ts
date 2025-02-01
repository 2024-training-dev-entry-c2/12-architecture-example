import { inject, Injectable } from "@angular/core";
import { UpdateMenuService } from "../../infrastructure/services/update-menu.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { ModalComponent } from "shared";

Injectable({
    providedIn : 'root'
})
export class UpdateMenuUsecase {
    private readonly _service = inject(UpdateMenuService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    currentMenu$(): Observable<IMenu>{
        return this._state.menus.currentMenu.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    selectMenu(id:number) : void {
        const currentMenu = this._state.menus.menus.snapshot().find(menu => menu.id == id);
        this._state.menus.currentMenu.set(currentMenu);
    }

    execute(menu: IMenu, modal: ModalComponent): void{
        this.subscriptions.add(
            this._service.execute(menu.id.toString(), menu).pipe(
                tap(result=>{
                    const menus = this._state.menus.menus.snapshot()
                    .map( menu => menu.id == result.id ? result : menu );
                    this._state.menus.menus.set(menus);
                    this._state.menus.currentMenu.set(null);
                }),
                finalize(()=> modal.toggle())   
            ).subscribe()
        )
    }
    //#endregion
}