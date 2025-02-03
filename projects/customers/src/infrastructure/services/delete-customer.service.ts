import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteCustomerService {
  http = inject(HttpClient);

  constructor() { }

  execute(id: number) {
    return this.http.delete(`${urlResources.customers}/${id}`);
  }

}
