import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { GetClientsUsecase } from '../../../../application/clients/get-clients.usecase';
import { Observable, share } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsComponent } from '../../components/get-clients/get-clients.component';
import { AsyncPipe } from '@angular/common';
import { DeleteClientUsecase } from '../../../../application/clients/delete-client.usecase';
import { CreateClientUsecase } from '../../../../application/clients/create-client.usecase';
import { ModalComponent } from 'shared';


@Component({
  selector: 'lib-client-container',
  imports: [GetClientsComponent, AsyncPipe],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent implements OnInit, OnDestroy {
  private readonly _getClientUseCase = inject(GetClientsUsecase);
  private readonly _deleteClientUsecase = inject(DeleteClientUsecase);
  private readonly _createClientUsecase = inject(CreateClientUsecase);
  public clients$: Observable<IClient[]>;
  mensajeExito: string | null = null;

  ngOnInit(): void {
    this._getClientUseCase.initSubscriptions();
    this._getClientUseCase.execute();
    this.getClients();
    this._createClientUsecase.initSubscriptions();
    this._deleteClientUsecase.initSubscriptions();
  }

  getClients(): void {
    this.clients$ = this._getClientUseCase.clients$();
  }
  deleteClient(id: number): void {
    this._deleteClientUsecase.execute(id)
  }
  onClientSubmitted({client, modal}:{client: IClient; modal:ModalComponent}){
    this._createClientUsecase.execute(client, modal);
  }

  ngOnDestroy(): void {
    this._getClientUseCase.destroySubscriptions();
    this._createClientUsecase.destroySubscriptions();
    this._deleteClientUsecase.destroySubscriptions();
  }

}
