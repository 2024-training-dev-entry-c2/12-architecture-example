import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableComponent, ModalComponent, AnimationWrapperComponent } from 'shared';
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsUseCase } from '../../../../application/get-clients.usecase';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModalUseCase } from '../../../../application/modal.usecase';
import { ClientFormComponent } from "../../forms/client-form/client-form.component";
import { UpdateClientUseCase } from '../../../../application/update-client.usecase';
import { CreateClientUseCase } from '../../../../application/create-client.usecase';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteClientUseCase } from '../../../../application/delete-client.usecase';

@Component({
  selector: 'lib-client',
  imports: [TableComponent, AnimationWrapperComponent, AsyncPipe, ClientFormComponent, ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit, OnDestroy {
  private readonly _useCaseGet = inject(GetClientsUseCase);
  private readonly _useCaseModal = inject(ModalUseCase);
  private readonly _useCaseCreate = inject(CreateClientUseCase);
  private readonly _useCaseUpdate = inject(UpdateClientUseCase);
  private readonly _useCaseDelete = inject(DeleteClientUseCase);

  public clients$: Observable<IClient[]>
  public isModalOpen$: Observable<boolean>;
  public selectedClient$: Observable<IClient>;
  public message$: Observable<string>;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'clientType', header: 'Tipo de cliente' }
  ]

  openModal(event: boolean) {
    this._useCaseModal.execute(event);
  }

  public submit(client: IClient) {
    const usecase = client.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(client);
  }

  public updateById(clientId: number): void {
    this._useCaseUpdate.selectClient(clientId);
  }

  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseGet.execute();
    this.clients$ = this._useCaseGet.client$();
    this.selectedClient$ = this._useCaseUpdate.currentClient$();
    this.message$ = this._useCaseCreate.message$();
    this.isModalOpen$ = this._useCaseModal.openModal$();
    this.clients$ = this._useCaseGet.client$();

  }
  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions
    this._useCaseGet.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
  }

  public deleteClientById(clientId: number): void {
    this._useCaseDelete.execute(clientId);
  }

  public updateClientById(clientId: number): void {
    this._useCaseUpdate.selectClient(clientId);
  }
}
