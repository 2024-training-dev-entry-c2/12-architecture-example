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
  private readonly __useCaseList = inject(GetUsersListUsecase);
  private readonly __useCaseGet = inject(GetUserUsecase);
  public user$: Observable<IClient>;
  public user: IClientRequest | null= {name:'perro',email:'asdasd@asd.com',isOften:false};
  clientList: IClient[] = [];
  client: IClient | null= null;

  ngOnInit(): void {
    this.__useCase.initSubscriptions();
    this.user$ = this.__useCase.user$();
    this.getClient(16);
  }
  ngOnDestroy(): void {
  this.__useCase.destroySubscriptions();
  }
  create(user:IClientRequest){
    this.__useCase.execute(user);
    console.log('user',user);
    
  }
  getUsers(){
    this.__useCaseList.execute();


    this.__useCaseList.clients$().subscribe({
      next: (clients: IClient[]) => {
        console.log('Clientes obtenidos:', clients); 
      
        this.clientList = clients;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err); 
      },
    });
    
  }
  getClient(id: number){
   this.__useCaseGet.execute(id);

   this.__useCase.user$().subscribe({
    next: (client: IClient) => {
      console.log('Cliente obtenido:', client.name); 
      this.client = client;
    },
    error: (err) => {
      console.error('Error al obtener cliente:', err); 
    },
  }); 
  }

}
