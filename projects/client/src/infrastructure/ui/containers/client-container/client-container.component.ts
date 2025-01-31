import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateClientUseCase } from '../../../../application/clients/create-client.usecase';
import { ListClientsUseCase } from '../../../../application/clients/list-clients.usecase';
import { IClient } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-client-container',
  imports: [],
  templateUrl: './client-container.component.html'
})
export class ClientContainerComponent implements OnInit, OnDestroy{
  private readonly _createUsecase = inject(CreateClientUseCase);
  private readonly _listUsecase = inject(ListClientsUseCase);
  
   ngOnInit(): void {
      this._listUsecase.initSubscriptions();
      this._createUsecase.initSubscriptions();
      this.loadClients();
  }
  
    ngOnDestroy(): void {
      this._listUsecase.destroySubscriptions();
      this._createUsecase.destroySubscriptions();
    }
  
    loadClients(): void {
      this._listUsecase.loadClients();
    }
   
    addClient(client: IClient): void {
      this._createUsecase.addClient(client);
      
    }
}
