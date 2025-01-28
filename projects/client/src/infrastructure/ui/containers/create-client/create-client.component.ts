import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateUserUsecase } from '../../../../application/users/create-user.usecase';
import { Observable } from 'rxjs';
import { Iclient } from '../../../../domain/model/client.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CreateClientFormComponent } from '../../forms/create-client-form/create-client-form.component';

@Component({
  selector: 'lib-create-client',
  imports: [AsyncPipe,JsonPipe,CreateClientFormComponent,HeaderComponent],
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent implements OnInit, OnDestroy {

  private readonly __useCase = inject(CreateUserUsecase);
  public user$: Observable<Iclient>;

  ngOnInit(): void {
    this.__useCase.initSubscriptions();
    this.user$ = this.__useCase.user$();
  }
  ngOnDestroy(): void {
  this.__useCase.destroySubscriptions();
  }
  create(user:Iclient){
    this.__useCase.execute(user);
  }
}
