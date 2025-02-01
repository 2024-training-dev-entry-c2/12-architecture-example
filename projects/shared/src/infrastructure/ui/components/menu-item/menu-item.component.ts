import { Component, input } from '@angular/core';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'lib-menu-item',
  imports: [RouterLink],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  imageSrc = input<string>();
  href = input<string>();
  title = input<string>();

}
