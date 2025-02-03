import { Injectable, inject } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DeleteClientService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/cliente";


    delete(id: number): Observable<string> {
        return this.http.delete(
            `${this.url}/${id}`,
            { responseType: 'text' }
        ) as Observable<string>;
    }

}