import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
    providedIn: 'root'
})

export class GetAllMenuService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/menu";


    getAll(): Observable<IMenu[]> {
        return this.http.get<IMenu[]>(this.url);
    }

}