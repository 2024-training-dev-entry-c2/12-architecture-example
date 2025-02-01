import { Injectable, inject } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class GetByIdClientService {
    private http = inject(HttpClient);
    private url = "http://localhost:8080/api/cliente";

    getById(id: number): Observable<IClient> {
        return this.http.get<IClient>(`${this.url}/${id}`);
    }

}