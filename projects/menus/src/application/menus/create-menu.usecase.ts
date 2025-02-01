import { inject, Injectable } from "@angular/core";
import { CreateMenuService } from "../../infrastructure/services/create-menu.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { ModalComponent } from "shared";

Injectable({
    providedIn : 'root'
})
export class CreateMenuUsecase {
    private readonly _service = inject(CreateMenuService);
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

    execute(menu: IMenu, modal: ModalComponent): void{
        this.subscriptions.add(
            this._service.execute(menu).pipe(
                tap(result =>{
                    const menus = this._state.menus.menus.snapshot();
                    this._state.menus.menus.set([...menus, result]);
                }),
                finalize(()=> modal.toggle())  
            ).subscribe()
        );
    }
    //#endregion
}