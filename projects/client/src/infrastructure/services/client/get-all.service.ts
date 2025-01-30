import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IClients } from "../../../domain/model/client.model";
import { environment } from "shared";

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(): Observable<IClients[]> {
    return this.http.get<IClients[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
