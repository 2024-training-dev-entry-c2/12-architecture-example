import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardMenuComponent } from '../card-menu/card-menu.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-view-menu',
  imports: [CommonModule,CardMenuComponent],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss'
})
export class ViewMenuComponent {

  @Input() menus: Observable<IMenu[]>;
  @Output() onDeleteMenu : EventEmitter<IMenu> = new EventEmitter<IMenu>();
  router = inject(Router);

  createMenu(){
    this.router.navigate([`/dashboard/menu/create`]);
  }

  handleDelete(menu: IMenu){
    this.onDeleteMenu.emit(menu);
  }

}
