import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map, catchError, throwError } from "rxjs";
import { TokenService, UserInfoService } from "shared";


export interface ILoginResponse {
    token: string
}

export interface ILoginRequest {
    username: string;
    password: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthenticateUserService {
    mainUrl = 'http://localhost:8080/api/v1/user';
    tokenService = inject(TokenService);
    userInfoService = inject(UserInfoService);
    http = inject(HttpClient);
    router = inject(Router);
    constructor(
    ) {

    }

    login(credentials: ILoginRequest): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${this.mainUrl}/authenticate`, credentials)
            .pipe(
                map((response: ILoginResponse) => {
                    this.tokenService.setToken(response.token);
                    this.userInfoService.setUserInfo({ username: credentials.username });
                    return response;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error);
                })
            );
    }

    logout(): void {
        this.tokenService.removeToken();
        this.userInfoService.removeInfo();
        this.router.navigate(['users/login']);
    }

}