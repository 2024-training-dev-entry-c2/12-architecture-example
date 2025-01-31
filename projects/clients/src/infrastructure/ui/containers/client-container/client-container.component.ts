import { Component, inject, OnInit } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { GetClientUseCase } from '../../../../application/create-client.usecase';
import { AsyncPipe } from '@angular/common';
import { TableClientsComponent } from '../../components/table-clients/table-clients.component';

@Component({
  selector: 'lib-client-container',
  imports: [AsyncPipe, TableClientsComponent],
  templateUrl: './client-container.component.html',
  styleUrl: './client-container.component.scss',
})
export class ClientContainerComponent {
  public clientes$:Observable<Iclient[]>;
  private readonly _getClientCase = inject(GetClientUseCase)

  ngOnInit(): void {
    this._getClientCase.initSubscriptions();
    this._getClientCase.execute();
    this.clientes$ = this._getClientCase.client$()
  }

  ngOndestroy():void{
    this._getClientCase.destroySubscriptions();
  }
}
