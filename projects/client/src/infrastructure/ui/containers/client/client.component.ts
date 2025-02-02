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
  private readonly _useCaseCreate = inject(CreateClientUsecase);
  private readonly _useCaseGet = inject(GetClientsUsecase);
  private readonly _useCaseDelete = inject(DeleteClientUsecase);
  private readonly _useCaseUpdate = inject(UpdateClientUsecase);
  private readonly _useCaseModal = inject(ModalUsecase);

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
    this._useCaseGet.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public deleteClient(clientId: number): void {
    this._useCaseDelete.execute(clientId);
  }

  public updateById(clientId: number): void {
    this._useCaseUpdate.selectClient(clientId);
  }

  public submit(client: IClient): void {
    const usecase = client.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(client);
  }

  public openModal(event: boolean): void {
    this._useCaseModal.execute(event);
  }

  private init(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();
  }

  private destroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseGet.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.clients$ = this._useCaseGet.clients$();
    this.currentClient$ = this._useCaseUpdate.currentClient$();
    this.message$ = this._useCaseCreate.message$();
    this.isOpen$ = this._useCaseModal.open$();
  }
}