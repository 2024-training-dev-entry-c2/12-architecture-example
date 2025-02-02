import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../domain/model/login.request.model';
import { IAdmin } from '../../domain/model/admin.model';
import { ConfigService, handleHttpError } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/admin`;
  }

  login(credentials: LoginRequest): Observable<IAdmin> {
    return this.http
      .post<IAdmin>(`${this.apiUrl}/login`, credentials)
      .pipe(handleHttpError());
  }
}
