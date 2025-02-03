import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
    providedIn: 'root'
})

export class RegisterDishService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/plato";


    save(dish: Partial<IDish>): Observable<string> {
        return this.http.post(
            this.url,
            dish,
            { responseType: 'text' }
        ) as Observable<string>;
    }

}