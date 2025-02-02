import { Component, inject, OnInit } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { GetClientUseCase } from '../../../../application/get-client.usecase';
import { AsyncPipe } from '@angular/common';
import { TableClientsComponent } from '../../components/table-clients/table-clients.component';
import { createClientUseCase } from '../../../../application/create-client.usecase';
import { UpdateClientUseCase } from '../../../../application/update-client.usecase';
import { ModalComponent } from 'shared';
import { DeleteClientUseCase } from '../../../../application/delete-client.usecase';

@Component({
  selector: 'lib-client-container',
  imports: [AsyncPipe, TableClientsComponent],
  templateUrl: './client-container.component.html',
  styleUrl: './client-container.component.scss',
})
export class ClientContainerComponent implements OnInit {
  public clientes$: Observable<Iclient[]>;
  public currentClient$: Observable<Iclient>;

  private readonly _getClientCase = inject(GetClientUseCase);
  private readonly _createUseCase = inject(createClientUseCase);
  private readonly _updateUseCase = inject(UpdateClientUseCase);
  private readonly _deleteUseCase = inject(DeleteClientUseCase);

  ngOnInit(): void {
    this._getClientCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getClientCase.execute();
    this.clientes$ = this._getClientCase.client$();
    this.currentClient$ = this._updateUseCase.clientCurrent$();
  }

  ngOndestroy(): void {
    this._getClientCase.destroySubscriptions();
  }

  hanglePatchClient({
    client,
    modal,
  }: {
    client: Iclient;
    modal: ModalComponent;
  }) {
    const usecase = client.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(client, modal);
  }

  handleSelectClient(id: number) {
    this._updateUseCase.selectClient(id);
  }

  handleDeleteClient(id: number) {
    this._deleteUseCase.execute(id);
  }
}
