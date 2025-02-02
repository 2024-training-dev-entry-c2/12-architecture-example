import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
    providedIn: 'root'
})

export class RegisterMenuService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/menu";


    save(menu: Partial<IMenu>): Observable<string> {
        return this.http.post(
            this.url,
            menu,
            { responseType: 'text' }
        ) as Observable<string>;
    }

}