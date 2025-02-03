import { Injectable,inject } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllClientService{
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/cliente";
  

    getAll(): Observable<IClient[]>{
        console.log("ENTRO EN EL SERVICIO!");
        return this.http.get<IClient[]>(this.url);
    }

}