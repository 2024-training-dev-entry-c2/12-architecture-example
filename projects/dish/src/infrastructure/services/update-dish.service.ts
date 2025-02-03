import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
    providedIn: 'root'
})

export class UpdateDishService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/plato";


    update(id: number, dish: Partial<IDish>): Observable<IDish> {
        return this.http.put<IDish>(`${this.url}/${id}`, dish);
    }

}