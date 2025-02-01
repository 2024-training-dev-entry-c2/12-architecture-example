import { Component, inject, input, output } from '@angular/core';


@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username = input<string>('');
}
