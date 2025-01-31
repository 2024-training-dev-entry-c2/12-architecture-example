import { inject, Inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Router } from "@angular/router";
import { AuthUserService } from "../infrastructure/services/auth-user.service";

@Injectable({
    providedIn: 'root',
})
export class LogOutUsecase {
    private readonly _authService = inject(AuthUserService);
    private readonly _router = inject(Router);

    execute(): void {
        this._authService.removeToken();
        this._authService.removeUsername();
        this._router.navigate(['/login']);
    }
}