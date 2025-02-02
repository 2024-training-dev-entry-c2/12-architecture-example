import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ClientComponentComponent } from "../../components/client-component/client-component.component";
import { GetClientUseCase } from '../../../../application/get-client.usecase';
import { IClient } from '../../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-client-container',
  imports: [ClientComponentComponent, AsyncPipe],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetClientUseCase);

  public clients$: Observable<IClient[]>;
  public currentMenu$: Observable<IClient>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();

    this._getUseCase.execute();
    this.clients$ = this._getUseCase.clients$();
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
  }

}
