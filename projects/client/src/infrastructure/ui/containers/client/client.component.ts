import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ModalComponent, TableComponent } from "shared";
import { CreateClientUsecase } from "../../../../application/client/create-client.usecase";
import { DeleteClientUsecase } from "../../../../application/client/delete-client.usecase";
import { GetClientsUsecase } from "../../../../application/client/get-clients.usecase";
import { UpdateClientUsecase } from "../../../../application/client/update-client.usecase";
import { ModalUsecase } from "../../../../application/modal.usecase";
import { IClient } from "../../../../domain/model/client.model";
import { ClientFormComponent } from "../../forms/client-form/client-form.component";

@Component({
  selector: 'lib-client',
  imports: [TableComponent, ModalComponent, ClientFormComponent, AsyncPipe],
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {
  private readonly _createUseCase = inject(CreateClientUsecase);
  private readonly _getUseCase = inject(GetClientsUsecase);
  private readonly _deleteUseCase = inject(DeleteClientUsecase);
  private readonly _updateUseCase = inject(UpdateClientUsecase);
  private readonly _modalUseCase = inject(ModalUsecase);

  public clients$: Observable<IClient[]>;
  public message$: Observable<string>;
  public isOpen$: Observable<boolean>;
  public currentClient$: Observable<IClient>;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'userType', header: 'Tipo de Usuario' }
  ];

  ngOnInit(): void {
    this.init();
    this._getUseCase.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public deleteClient(clientId: number): void {
    this._deleteUseCase.execute(clientId);
  }

  public updateById(clientId: number): void {
    this._updateUseCase.selectClient(clientId);
  }

  public submit(client: IClient): void {
    const usecase = client.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(client);
  }

  public openModal(event: boolean): void {
    this._modalUseCase.execute(event);
  }

  private init(): void {
    this._createUseCase.initSubscriptions();
    this._getUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._modalUseCase.initSubscriptions();
  }

  private destroy(): void {
    this._createUseCase.destroySubscriptions();
    this._getUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._modalUseCase.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.clients$ = this._getUseCase.clients$();
    this.currentClient$ = this._updateUseCase.currentClient$();
    this.message$ = this._createUseCase.message$();
    this.isOpen$ = this._modalUseCase.open$();
  }
}