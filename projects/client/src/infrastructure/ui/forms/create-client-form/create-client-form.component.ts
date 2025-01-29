import { Component, output } from '@angular/core';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-create-client-form',
  imports: [],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {
onSubmit = output<IClientRequest>(); 

submit(){
  this.onSubmit.emit({name:'perro',email:'asdasd@asd.com',isOften:false});  
}
}
