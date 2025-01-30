import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetClientsComponent } from "../../components/get-clients/get-clients.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'lib-get-clients-layout',
  imports: [RouterOutlet, GetClientsComponent, HeaderComponent],
  templateUrl: './get-clients-layout.component.html',
  styleUrl: './get-clients-layout.component.css'
})
export class GetClientsLayoutComponent {

}
