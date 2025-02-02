import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private readonly _httpClient: HttpClient;
  execute(customerId: number): void {
    this._httpClient.delete(RESOURCES.customerById(customerId));
  }
}
