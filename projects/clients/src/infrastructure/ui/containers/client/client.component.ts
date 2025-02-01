import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from 'shared';
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsUseCase } from '../../../../application/get-clients.usecase';
import { AsyncPipe } from '@angular/common';
import { ModalUseCase } from '../../../../application/modal.usecase';
import { AnimationWrapperComponent } from 'shared';

@Component({
  selector: 'lib-client',
  imports: [TableComponent, AsyncPipe, AnimationWrapperComponent],
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit, OnDestroy {
  private readonly _useCaseGet = inject(GetClientsUseCase);
  private readonly _useCaseModal = inject(ModalUseCase)

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

  ngOnInit(): void {
    this._useCaseGet.initSubscriptions();
    this._useCaseGet.execute();
    this.isModalOpen$ = this._useCaseModal.openModal$();
    this.clients$ = this._useCaseGet.client$();

  }
  ngOnDestroy(): void {
    this._useCaseGet.destroySubscriptions();
  }
}
