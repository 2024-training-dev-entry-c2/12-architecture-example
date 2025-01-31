import { Component, inject, OnDestroy, OnInit, output } from "@angular/core";
import { ModalComponent, TableComponent } from "shared";
import { AsyncPipe } from "@angular/common";
import { IClient } from "../../../../domain/model/client.model";
import { Observable } from "rxjs";
import { ClientFormComponent } from "../../forms/client-form/client-form.component";
import { CreateClientUsecase } from "../../../../application/client/create-client.usecase";
import { GetClientsUsecase } from "../../../../application/client/get-clients.usecase";
import { DeleteClientUsecase } from "../../../../application/client/delete-client.usecase";
import { UpdateClientUsecase } from "../../../../application/client/update-client.usecase";

@Component({
  selector: 'lib-client',
  imports: [TableComponent, ModalComponent, ClientFormComponent, AsyncPipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit, OnDestroy {
  private readonly _useCaseCreate = inject(CreateClientUsecase);
  private readonly _useCaseGet = inject(GetClientsUsecase);
  private readonly _useCaseDelete = inject(DeleteClientUsecase);
  private readonly _useCaseUpdate = inject(UpdateClientUsecase);
  public clients$: Observable<IClient[]>;
  public message$: Observable<string>;

  public currentClient$: Observable<IClient>;
  public isOpen: boolean = false;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'userType', header: 'Tipo de Usuario' }
  ];

  public openModal(event: boolean) {
    this.isOpen = event;
  }
 
  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseGet.execute();
    this.clients$ = this._useCaseGet.clients$();
    this.currentClient$ = this._useCaseUpdate.currentClient$();
    this.message$ = this._useCaseCreate.message$();
  }

  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseGet.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions();
  }

  public deleteClient(clientId: number): void {
    this._useCaseDelete.execute(clientId);
  }

  public updateById(clientId: number): void {
    this._useCaseUpdate.selectClient(clientId);
  }

  public submit(client: IClient) {
    const usecase = client.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(client);
  }
}