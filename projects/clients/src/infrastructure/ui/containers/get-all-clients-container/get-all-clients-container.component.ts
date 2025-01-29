import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { GetAllClientsUsecase } from '../../../../application/get-client.usecase';
import { AsyncPipe } from '@angular/common';
import { ClientPageComponent } from '../../components/client-page/client-page.component';

@Component({
  selector: 'lib-get-all-clients-container',
  imports: [AsyncPipe, ClientPageComponent],
  templateUrl: './get-all-clients-container.component.html',
})
export class GetAllClientsContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllClientsUsecase);
  public clients$: Observable<IClient[]>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.getAllClients();
    this.clients$ = this._useCase.clients$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  getAllClients(): void {
    this._useCase.execute();
  }

}
