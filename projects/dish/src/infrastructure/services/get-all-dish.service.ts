import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
    providedIn: 'root'
})

export class GetAllDishService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/plato";


    getAll(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.url);
    }

}