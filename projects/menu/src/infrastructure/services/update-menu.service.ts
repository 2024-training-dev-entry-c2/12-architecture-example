import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
    providedIn: 'root'
})

export class UpdateMenuService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/menu";


    update(id: number, menu: Partial<IMenu>): Observable<IMenu> {
        return this.http.put<IMenu>(`${this.url}/${id}`, menu);
    }

}