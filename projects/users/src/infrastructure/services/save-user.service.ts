import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'shared';
import { IUserRequest } from '../../domain/model/user-request.model';
import { IUserResponse } from '../../domain/model/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class SaveUserService {
  private http = inject(HttpClient);

  saveUser(user: IUserRequest):Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${Environment.baseApi}/auth/users`, user);
  }

}