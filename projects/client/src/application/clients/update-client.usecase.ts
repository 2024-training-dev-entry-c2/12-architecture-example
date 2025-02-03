import { Injectable, inject } from '@angular/core';
import { first, map, Observable, switchMap } from 'rxjs';
import { UpdateClientService } from '../../infrastructure/services/update-client.service';
import { ListClientsUseCase } from './list-clients.usecase';
import { IClient } from '../../domain/model/clients.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientUseCase {
  private readonly _updateService = inject(UpdateClientService);
  private readonly _listUsecase = inject(ListClientsUseCase);

  updateClient(clientId: number, updatedClientData: IClient, clients$: Observable<IClient[]>): Observable<IClient> {
    return clients$.pipe(
      first(),
      map(clients => clients.find(client => client.idClient === clientId)), 
      switchMap(clientToUpdate => {
        if (!clientToUpdate) {
          throw new Error('Cliente no encontrado');
        }

        const updatedClient: IClient = {
          ...clientToUpdate,
          ...updatedClientData
        };

        return this._updateService.updateClient(clientId, updatedClient).pipe(
          map(updatedClient => {
            this._listUsecase.loadClients(); 
            return updatedClient;
          })
        );
      })
    );
  }

}
