import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private http = inject(HttpClient);
  private _environmentService: EnvironmentService = inject(EnvironmentService);

  execute(id: number): Observable<void> {
    return this.http.delete<void>(
      this._environmentService.apiUrl + '/client/' + id
    );
  }
}
