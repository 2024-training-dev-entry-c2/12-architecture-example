import { Component, output } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-create-client-form',
  imports: [],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {
onSubmit = output<Iclient>(); 

submit(){
  this.onSubmit.emit({id:1,name:'perro',email:'asdasd@asd.com',isOften:true,orderIds:[1,2,3]});  
}
}
