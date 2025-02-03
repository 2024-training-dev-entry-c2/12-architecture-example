import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteMenusService } from "../../infrastructure/services/delete-menus.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteMenuUseCase {
    private readonly _service = inject(DeleteMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: string): void {
        if (!id) {
            console.error('No se proporcionó un ID válido para eliminar el plato.');
            return;
        }

        this.subscriptions.add(
            this._service.deleteMenu(id)
            .pipe(
                tap(() => {
                    setTimeout(() => {
                        const menus = this._state.menus.menu.snapshot();
                        const newMenus = menus.filter(menu => menu.id !== id);
                        this._state.menus.menu.set(newMenus);
                    }, 500);
                })
            ).subscribe()
        );
    }
}