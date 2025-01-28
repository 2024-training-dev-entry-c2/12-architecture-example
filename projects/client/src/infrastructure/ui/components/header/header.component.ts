import { Component, input } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 public user = input<Iclient>();
}
