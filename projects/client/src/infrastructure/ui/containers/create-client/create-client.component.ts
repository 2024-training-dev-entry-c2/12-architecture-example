import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateUserUsecase } from '../../../../application/clients/create-user.usecase';
import { Observable } from 'rxjs';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CreateClientFormComponent } from '../../forms/create-client-form/create-client-form.component';
import { GetUsersListUsecase } from '../../../../application/clients/list-client.usercase';
import { GetUserUsecase } from '../../../../application/clients/get-client.usercase';

@Component({
  selector: 'lib-create-client',
  imports: [AsyncPipe,CreateClientFormComponent,HeaderComponent],
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
    console.log("user",user);
    
    this.__useCase.execute(user);
    console.log('user',user);
    
  }
  


}
