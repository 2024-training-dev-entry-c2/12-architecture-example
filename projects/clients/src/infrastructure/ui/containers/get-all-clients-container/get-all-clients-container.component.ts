import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { GetAllClientsUsecase } from '../../../../application/get-client.usecase';
import { AsyncPipe } from '@angular/common';
import { ClientPageComponent } from '../../components/client-page/client-page.component';
import { DeleteClientUsecase } from '../../../../application/delete-client.usecase';
import { AddClientUsecase } from '../../../../application/add-client.usecase';
import { ModalComponent } from 'shared';
import { UpdateClientUsecase } from '../../../../application/update-client.usecase';

@Component({
  selector: 'lib-get-all-clients-container',
  imports: [AsyncPipe, ClientPageComponent],
  templateUrl: './get-all-clients-container.component.html',
})
export class GetAllClientsContainerComponent implements OnInit, OnDestroy {
  private readonly _getAlluseCase = inject(GetAllClientsUsecase);
  private readonly _deleteClientUseCase = inject(DeleteClientUsecase);
  private readonly _createClientUseCase = inject(AddClientUsecase);
  private readonly _updateClientUseCase = inject(UpdateClientUsecase);
  public clients$: Observable<IClient[]>;
  public currentClient$: Observable<IClient>;

  ngOnInit(): void {
    this._getAlluseCase.initSubscriptions();
    this._createClientUseCase.initSubscriptions();
    this._updateClientUseCase.initSubscriptions();
    this._getAlluseCase.execute();
    this.clients$ = this._getAlluseCase.clients$();
    this.currentClient$ = this._updateClientUseCase.currentClient$();
  }

  
  ngOnDestroy(): void {
    this._createClientUseCase.destroySubscriptions();
    this._getAlluseCase.destroySubscriptions();
    this._updateClientUseCase.destroySubscriptions();
  }

  handleClient({client, modal}: {client: IClient; modal: ModalComponent}){
    const usecase = client.id ? this._updateClientUseCase : this._createClientUseCase;
    usecase.execute(client, modal);
    modal.toggle();
  }

  handleDelete(id: number) {
    this._deleteClientUseCase.execute(id);
  }

  handleSelectClient(id: number) {
    this._updateClientUseCase.selectClient(id);
  }


}
