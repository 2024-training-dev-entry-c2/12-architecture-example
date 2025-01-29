import { Component, input } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-page',
  imports: [],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent {

  public clients = input<IClient[]>();
}
