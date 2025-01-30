import { Component, inject } from '@angular/core';
import { GetClientsUsecase } from '../../../../application/clients/get-clients.usecase';
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsComponent } from '../../components/get-clients/get-clients.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'lib-client-container',
  imports: [GetClientsComponent, AsyncPipe],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent {
  private readonly _useCase = inject(GetClientsUsecase);
  public clients$: Observable<IClient[]>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.clients$ = this._useCase.clients$();
    this.getClients();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  getClients(): void {
    this._useCase.execute();
  }

}
