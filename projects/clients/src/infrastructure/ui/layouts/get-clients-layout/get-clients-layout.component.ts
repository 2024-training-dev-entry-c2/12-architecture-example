import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'lib-get-clients-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './get-clients-layout.component.html',
  styleUrl: './get-clients-layout.component.scss'
})
export class GetClientsLayoutComponent {

}
