import { Injectable } from '@angular/core';
import { IClients } from '../../domain/model/clients.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
 private apiUrl = 'http://localhost:8080/api/clients';
  
  // create(client: IClients): void{
  //  return this.http.post<IClients>(this.apiUrl, client);
  // }

}
