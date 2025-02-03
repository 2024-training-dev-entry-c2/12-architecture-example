import { Injectable, inject } from '@angular/core';
import { DeleteMenuService } from '../../infrastructure/services/delete-menu.service';
import { ListMenusUseCase } from './list-menus.usecase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuUseCase {
  private readonly _deleteService = inject(DeleteMenuService);
  private readonly _listUsecase = inject(ListMenusUseCase);

  deleteMenu(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this._deleteService.deleteMenu(id).subscribe({
        next: () => {
          this._listUsecase.loadMenus(); 
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
