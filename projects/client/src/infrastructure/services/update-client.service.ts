import { Injectable, inject } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UpdateClientService {
    private http = inject(HttpClient);
    private url = "http://localhost:8080/api/cliente";

    update(id: number, client: Partial<IClient>): Observable<IClient> {
        return this.http.put<IClient>(`${this.url}/${id}`, client);
    }

}