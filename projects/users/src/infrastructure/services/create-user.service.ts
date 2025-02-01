import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser, IUserRequest, IUserResponse } from '../../domain/model/user.model';
import { TokenService, UserInfoService } from 'shared';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  mainUrl = 'http://localhost:8080/api/v1/user';
      tokenService = inject(TokenService);
      userInfoService = inject(UserInfoService);
      http = inject(HttpClient);
      router = inject(Router);

  constructor() { }


  create(userData: IUserRequest): Observable<IUserResponse>{
    return this.http.post<IUserResponse>(`${this.mainUrl}/create`, userData);

  }
}
