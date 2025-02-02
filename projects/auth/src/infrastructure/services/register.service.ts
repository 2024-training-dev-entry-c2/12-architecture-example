import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, handleHttpError } from 'shared';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../../domain/model/register.request.model';
import { IUser } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/admin`;
  }

  register(credentials: RegisterRequest): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.apiUrl}/register`, credentials)
      .pipe(handleHttpError());
  }
}
