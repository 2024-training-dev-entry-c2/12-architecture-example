import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'http://localhost:8080/api/v1';  

    constructor(private http: HttpClient) {
     }

    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/create`, userData);
    }
    

}
