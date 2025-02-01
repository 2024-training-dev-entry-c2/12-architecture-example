import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { GetClientsUsecase } from '../../../../application/clients/get-clients.usecase';
import { Observable, share } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsComponent } from '../../components/get-clients/get-clients.component';
import { AsyncPipe } from '@angular/common';
import { DeleteClientUsecase } from '../../../../application/clients/delete-client.usecase';
import { CreateClientUsecase } from '../../../../application/clients/create-client.usecase';
import { ModalComponent } from 'shared';
import { UpdateClientUseCase } from '../../../../application/clients/update-client.usecase';


@Component({
  selector: 'lib-client-container',
  imports: [GetClientsComponent, AsyncPipe],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent implements OnInit, OnDestroy {
  private readonly _getClientUseCase = inject(GetClientsUsecase);
  private readonly _deleteClientUseCase = inject(DeleteClientUsecase);
  private readonly _createClientUseCase = inject(CreateClientUsecase);
  private readonly _updateClientUseCase = inject(UpdateClientUseCase);
  public clients$: Observable<IClient[]>;
  public currentClient$: Observable<IClient>;


  ngOnInit(): void {
    this._getClientUseCase.initSubscriptions();
    this._getClientUseCase.execute();
    this.getClients();
    this._createClientUseCase.initSubscriptions();
    this._updateClientUseCase.initSubscriptions();
    this._deleteClientUseCase.initSubscriptions();
    this.currentClient$ = this._updateClientUseCase.currentClient$();
  }

  getClients(): void {
    this.clients$ = this._getClientUseCase.clients$();
  }
  deleteClient(id: number): void {
    this._deleteClientUseCase.execute(id)
  }
  handlePatchClient({ client, modal }: { client: IClient; modal: ModalComponent }) {
    const usecase = client.id ? this._updateClientUseCase : this._createClientUseCase;
    usecase.execute(client, modal);
  }
  ngOnDestroy(): void {
    this._getClientUseCase.destroySubscriptions();
    this._createClientUseCase.destroySubscriptions();
    this._deleteClientUseCase.destroySubscriptions();
    this._updateClientUseCase.destroySubscriptions();
  }
  handleSelectClient(id: number){
    this._updateClientUseCase.selectClient(id);
  }
}
