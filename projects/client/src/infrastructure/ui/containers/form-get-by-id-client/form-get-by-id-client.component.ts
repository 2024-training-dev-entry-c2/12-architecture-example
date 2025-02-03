import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormByIdClientComponent } from '../../forms/form-by-id-client/form-by-id-client.component';
import { IClient } from '../../../../domain/model/client.model';
import { GetByIdClientUseCase } from '../../../../application/get-by-id-client.useCase';
import { Observable,Subscription} from "rxjs";
import { GetByIdClientCompComponent } from '../../components/get-by-id-client-comp/get-by-id-client-comp.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-form-get-by-id-client',
  imports: [FormByIdClientComponent,GetByIdClientCompComponent,AsyncPipe],
  templateUrl: './form-get-by-id-client.component.html',
  styles: ''
})

export class FormGetByIdClientComponent implements OnInit, OnDestroy {

  private getByIdUseCase = inject(GetByIdClientUseCase);
  public client:IClient;
  client$!: Observable<IClient>;
  private subscription: Subscription;

  ngOnInit(): void {
    this.getByIdUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.getByIdUseCase.destroySubscriptions();
    this.subscription?.unsubscribe();
  }


  handleGetId(id: number) {
    this.getByIdUseCase.execute(id);
    this.client$ = this.getByIdUseCase.client$();

    this.subscription = this.client$.subscribe(client => {
      this.client = client;
    });
  }
  
}
