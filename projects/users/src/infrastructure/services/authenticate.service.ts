import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRequestDTO } from '../../domain/model/user.request.model';
import { IAuthResponseDTO } from '../../domain/model/auth.response.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private http = inject(HttpClient);

  constructor() {}

  login(user: IUserRequestDTO): Observable<IAuthResponseDTO> {
    return this.http.post<IAuthResponseDTO>(
      `${environment.baseUrl}/user/login`,
      user
    );
  }
}
