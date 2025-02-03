import { Injectable, inject } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegisterClientService {
    private http = inject(HttpClient);
    private url = "http://localhost:8080/api/cliente";
    
    save(Client: Partial<IClient>): Observable<string> {
        return this.http.post(
            this.url,
            Client,
            { responseType: 'text' }
        ) as Observable<string>;
    }
}