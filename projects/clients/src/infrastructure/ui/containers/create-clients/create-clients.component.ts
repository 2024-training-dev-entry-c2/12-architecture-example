import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateClientUsecase } from '../../../../application/clients/create-client.usecase';
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { IClientRequest } from '../../../../domain/model/client-request.model';

@Component({
  selector: 'lib-create-clients',
  imports: [],
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.css'
})
export class CreateClientsComponent implements OnInit, OnDestroy{
  private readonly _useCase = inject(CreateClientUsecase);
  public clients$: Observable<IClient[]>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.clients$ = this._useCase.clients$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createClient(client: IClientRequest): void{
    this._useCase.execute(client);
  }
}
