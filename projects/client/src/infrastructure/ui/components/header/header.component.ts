import { Component, input } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 public user = input<IClient>();
}
