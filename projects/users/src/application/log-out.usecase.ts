import { inject, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService, UserSessionService } from "shared";

@Injectable({
    providedIn: 'root',
})
export class LogOutUsecase {
    private readonly _router = inject(Router);
    private readonly _tokenService = inject(TokenService);
    private readonly _userSessionService = inject(UserSessionService);
    execute(): void {
        this._tokenService.removeToken();
        this._userSessionService.removeUsername();
        this._router.navigate(['/login']);
    }
}