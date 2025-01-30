import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteClientService } from '../../infrastructure/services/delete-client.service';
import { ListClientsUseCase } from './list-clients.usecase';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientUseCase {
  private readonly _deleteService = inject(DeleteClientService);
  private readonly _listUsecase = inject(ListClientsUseCase);

  deleteClient(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this._deleteService.deleteClient(id).subscribe({
        next: () => {
          this._listUsecase.loadClients(); 
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
