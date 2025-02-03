import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subject, Subscription, takeUntil } from "rxjs";
import { GetMenusService } from "../../infrastructure/services/get-menus.service";
import { IMenu } from "../../domain/model/menus.model";

@Injectable({
  providedIn: 'root',
})
export class GetMenusUseCase{
  private readonly _service = inject(GetMenusService);
   private readonly _state = inject(State);
  private subscriptions = new Subscription();
 
   menu$(): Observable<IMenu[]> {
     return this._state.menus.menu.$();
   }
 
   initSubscriptions(): void {
     this.subscriptions = new Subscription();
   }
 
   getMenusSnapshot(): IMenu[] {
     return this._state.menus.menu.snapshot();
   }
 
   execute(): void {
     if (this.getMenusSnapshot()?.length) {
       return;
     }
 
     this._service
       .getMenus()
       .subscribe({
         next: (menus) => {
           this._state.menus.menu.set(menus);
         },
         error: (error) => {
           console.error('Error fetching menus:', error);
         },
       });
   }
 
   destroySubscriptions(): void {
     this.subscriptions.unsubscribe();
 }
}
