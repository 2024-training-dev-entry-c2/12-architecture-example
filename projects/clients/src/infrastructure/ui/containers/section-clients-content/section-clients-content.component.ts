import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SectionClientsComponent } from "../../components/section-clients/section-clients.component";
import { GetClientUseCase } from '../../../../application/clients/get-client.usescase';
import { Observable } from 'rxjs';
import { IClients } from '../../../../domain/model/clients.model';


@Component({
  selector: 'lib-section-clients-content',
  imports: [SectionClientsComponent],
  templateUrl: './section-clients-content.component.html',
})
export class SectionClientsContentComponent implements OnInit, OnDestroy {

  private readonly _getClientUseCase = inject(GetClientUseCase);
  public clients$: Observable<IClients[]>;

  ngOnInit(): void {
    this.clients$ = this._getClientUseCase.client$();
    this._getClientUseCase.execute();
  }

  ngOnDestroy(): void {
    this._getClientUseCase.ngOnDestroy();
  }

}
