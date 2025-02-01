import { inject, Injectable } from "@angular/core";
import { delay, of, Subscription, tap } from "rxjs";
import { LoaderService } from "shared";
import { State } from "../../domain/state";
import { AuthenticateUserService } from "../../infrastructure/services/authenticate-user.service";

@Injectable({
    providedIn: 'root'
})
export class LogoutUseCase {
    private readonly _service = inject(AuthenticateUserService);
    private readonly _state = inject(State);
    private  _loaderService = inject(LoaderService)
    private subscriptions: Subscription;


    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }
    
    execute(): void {
        this._loaderService.show();
        of(1).pipe(
            delay(2000),
            tap(() => this._service.logout()),
            tap(() => this._state.users.authInfo.set(null)),
            tap(() => this._loaderService.hide())
        ).subscribe();
    }

    
}