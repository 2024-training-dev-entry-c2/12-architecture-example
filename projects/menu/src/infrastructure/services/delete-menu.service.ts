import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuService {
  private readonly _httpClient = inject(HttpClient);
  execute(menuId: number): Observable<void> {
    return this._httpClient.delete<void>(RESOURCES.menuById(menuId));
  }
}
