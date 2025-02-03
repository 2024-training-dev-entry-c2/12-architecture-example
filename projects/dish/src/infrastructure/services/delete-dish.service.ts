import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DeleteDishService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/plato";


    delete(id: number): Observable<string> {
        return this.http.delete(
            `${this.url}/${id}`,
            { responseType: 'text' }
        ) as Observable<string>;
    }

}