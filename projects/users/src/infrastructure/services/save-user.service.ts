import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserRequestDTO } from '../../domain/model/user.request.model';
import { Observable } from 'rxjs';
import { IUserResponseDTO } from '../../domain/model/user.response.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class SaveUserService {
  private http = inject(HttpClient);

  constructor() {}
  saveUser(user: IUserRequestDTO): Observable<IUserResponseDTO> {
    return this.http.post<IUserResponseDTO>(
      `${environment.baseUrl}/user/register`,
      user
    );
  }
}
