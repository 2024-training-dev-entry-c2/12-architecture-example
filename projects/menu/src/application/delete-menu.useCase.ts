import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteMenuService } from "../infrastructure/services/delete-menu.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteMenuUseCase {
    private readonly _service = inject(DeleteMenuService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.delete(id)
                .pipe(
                    tap(response => {
                        console.log(`Menú eliminado: ${response}`);

                        // Obtener la lista actual de menús desde el estado
                        const currentMenus = this._state.menus.menu.snapshot();

                        // Filtrar el menú eliminado
                        const updatedMenus = currentMenus.filter(menu => menu.id !== id);

                        // Actualizar el estado con la nueva lista de menús
                        this._state.menus.menu.set(updatedMenus);
                    })
                )
                .subscribe()
        );
    }
}
