import { Component, inject, OnInit } from '@angular/core';
import { GetUserUsecase } from '../../../../application/clients/get-client.usercase';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { ActivatedRoute } from '@angular/router';
import { UpdateClientUsecase } from '../../../../application/clients/update-client.usercase';
import { UpdateClientFormComponent } from '../../forms/update-client-form/update-client-form.component';
import { ListClientComponent } from '../list-client/list-client.component';

@Component({
  selector: 'lib-update-client',
  imports: [UpdateClientFormComponent, ListClientComponent],
  templateUrl: './update-client.component.html',
})
export class UpdateClientComponent implements OnInit {
 private readonly __useCaseGet = inject(GetUserUsecase);
 private readonly __useCaseUpdate = inject(UpdateClientUsecase);

 client: IClient | null= null;

 clientId: number;

 constructor(private route: ActivatedRoute) {}

 ngOnInit(): void {
  
   this.clientId = +this.route.snapshot.params['id'];
   this.getClient(this.clientId); 
   console.log(this.clientId);

 }

 getClient(id: number){
  this.__useCaseGet.execute(id);

  this.__useCaseGet.user$().subscribe({
   next: (client: IClient) => {
     console.log('Cliente obtenido:', client); 
     this.client = client;
   },
   error: (err) => {
     console.error('Error al obtener cliente:', err); 
   },
 }); 
 }
 UpdateClient(user: IClientRequest){

   this.__useCaseUpdate.execute(user,this.clientId);
 }



}
