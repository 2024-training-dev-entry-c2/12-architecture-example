import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'shared';
import { IUserResponse } from '../../domain/model/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {
  private http = inject(HttpClient);

   getAllUsers():Observable<IUserResponse[]> {
    return this.http.get<IUserResponse[]>(`${Environment.baseApi}/auth/users`);
  }

}