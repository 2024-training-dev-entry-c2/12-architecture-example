import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card-menu',
  imports: [CommonModule],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss'
})
export class CardMenuComponent {

  @Input() menu: IMenu = {} as IMenu;
  router = inject(Router);
  @Output() onDeleteMenu : EventEmitter<IMenu> = new EventEmitter<IMenu>()

  createDish(){
    this.router.navigate([`/dashboard/dishes/create/${this.menu.id}`]);
  }

  updateMenu(){
    this.router.navigate([`/dashboard/menu/update/${this.menu.id}`]);
  }

  removeMenu(){
    this.onDeleteMenu.emit(this.menu);
  }
}
