import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsComponent } from "../../components/clients/clients.component";
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/clients.model';
import { ListClientsUseCase } from '../../../../application/clients/list-clients.usecase';
import { AsyncPipe } from '@angular/common';
import { CreateClientUseCase } from '../../../../application/clients/create-client.usecase';
import { ModalComponent } from 'shared';
import { UpdateClientUseCase } from '../../../../application/clients/update-client.useCase';
import { DeleteClientUseCase } from '../../../../application/clients/delete-client.useCase';

@Component({
  selector: 'lib-clients-container',
  imports: [ClientsComponent, AsyncPipe],
  templateUrl: './clients-container.component.html'
})
export class ClientsContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(ListClientsUseCase);
  private readonly _createUseCase = inject(CreateClientUseCase);
  private readonly _updateUseCase = inject(UpdateClientUseCase);
  private readonly _deleteUseCase = inject(DeleteClientUseCase);
  public clients$: Observable<IClient[]>;
  public currentClient$: Observable<IClient>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.clients$ = this._getUseCase.client$();
    this.currentClient$ = this._updateUseCase.currentClient$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleCreateClients( {client, modal} :{client: IClient; modal: ModalComponent}) {
   const useCase = client.id ? this._updateUseCase : this._createUseCase;
    setTimeout(() => {
      useCase.execute(client, modal);
    }, 500);
  }

  handleSelectClient(id: string) {
    setTimeout(() => {
      this._updateUseCase.selectClient(id);
    }, 500);
  }

  handleDeleteClient(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setTimeout(() => {
        this._deleteUseCase.execute(id);
      }, 500);
    }
  }
}
