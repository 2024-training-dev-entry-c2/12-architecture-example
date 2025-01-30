import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'shared';
import { ICustomerResponse } from '../../domain/model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListCustomersService {
  private http = inject(HttpClient);
  private _environmentService: EnvironmentService = inject(EnvironmentService);

  execute(): Observable<ICustomerResponse[]> {
    return this.http.get<ICustomerResponse[]>(
      this._environmentService.apiUrl + '/client'
    );
  }
}
