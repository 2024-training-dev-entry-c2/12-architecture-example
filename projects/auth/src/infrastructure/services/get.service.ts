import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, handleHttpError } from 'shared';
import { IUser } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/admin`;
  }

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(handleHttpError());
  }
}
