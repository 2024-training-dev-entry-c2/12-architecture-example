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
export class UpdateCustomerService {
  private http = inject(HttpClient);
  private _environmentService: EnvironmentService = inject(EnvironmentService);

  execute(id: number, payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.put<ICustomerResponse>(
      this._environmentService.apiUrl + '/client/' + id,
      payload
    );
  }
}
