import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private readonly _httpClient: HttpClient;
  execute(customerId: number): Observable<void> {
    return this._httpClient.delete<void>(RESOURCES.customerById(customerId));
  }
}
