import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateUserUsecase } from '../../../../application/clients/create-user.usecase';
import { Observable } from 'rxjs';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { CreateClientFormComponent } from '../../forms/create-client-form/create-client-form.component';
@Component({
  selector: 'lib-create-client',
  imports: [CreateClientFormComponent],
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent implements OnInit, OnDestroy {

  private readonly __useCase = inject(CreateUserUsecase);
 
  public user$: Observable<IClient>;
  clientList: IClient[] = [];

  ngOnInit(): void {
    this.__useCase.initSubscriptions();
    this.user$ = this.__useCase.user$();
  }
  
  ngOnDestroy(): void {
  this.__useCase.destroySubscriptions();
  }

  create(user:IClientRequest){
    this.__useCase.execute(user);
  }
  


}
