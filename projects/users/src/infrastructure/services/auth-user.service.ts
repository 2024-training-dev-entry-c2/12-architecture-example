import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../../domain/model/auth-response.model';
import { IAuthRequest } from '../../domain/model/auth-request.model';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private http = inject(HttpClient);

  authUser(auth: IAuthRequest):Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${Environment.baseApi}/auth/login`, auth);
  }

}