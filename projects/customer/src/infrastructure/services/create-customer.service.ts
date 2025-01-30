import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'shared';
import {
  ICustomer,
  ICustomerResponse,
} from '../../domain/model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);
  private _environmentService: EnvironmentService = inject(EnvironmentService);

  execute(payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.post<ICustomerResponse>(
      this._environmentService.apiUrl + '/client',
      payload
    );
  }
}
