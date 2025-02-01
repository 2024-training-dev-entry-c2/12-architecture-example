import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http.delete<void>(urlResources.customerOperationsById(id));
  }
}
