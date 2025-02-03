import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ClientComponentComponent } from '../../components/client-component/client-component.component';
import { GetClientUseCase } from '../../../../application/get-client.usecase';
import { IClient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateClientUseCase } from '../../../../application/create-menu.usecase';
import { DeleteClientUseCase } from '../../../../application/delete-client.usecase';
import { UpdateClientUseCase } from '../../../../application/update-menu.usecase';

@Component({
  selector: 'lib-client-container',
  imports: [ClientComponentComponent, AsyncPipe],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetClientUseCase);
  private readonly _postUseCase = inject(CreateClientUseCase);
  private readonly _deleteUseCase = inject(DeleteClientUseCase);
  private readonly _updateUseCase = inject(UpdateClientUseCase);

  public clients$: Observable<IClient[]>;
  public currentClient$: Observable<IClient>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._postUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();
    this.clients$ = this._getUseCase.clients$();
    this.currentClient$ = this._updateUseCase.currentClient$();
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._postUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }

  handleCreateOrUpdate(client: IClient) {
    const usecase = client.id ? this._updateUseCase : this._postUseCase;
    usecase.execute(client);
  }

  handleSelect(client: IClient) {
    this._updateUseCase.selectMenu(client.id)
  }

  handleDelete(id: number) {
    this._deleteUseCase.execute(id);
  }
}
