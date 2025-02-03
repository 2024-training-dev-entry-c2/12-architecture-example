import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../../../../domain/model/menuitem';

@Component({
  selector: 'lib-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  menuItem = input<MenuItem>();
}
