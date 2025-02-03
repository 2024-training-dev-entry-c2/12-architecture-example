import {  CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { IDish } from '../../../../domain/model/dishes.model';
import { IMenu, ListMenusService } from 'menu';
import { ListDishService } from '../../../services/list-dish.service';

@Component({
  selector: 'lib-dish-main',
  imports: [ CurrencyPipe, TitleCasePipe],
  templateUrl: './dish-main.component.html',
  styleUrl: './dish-main.component.scss'
})
export class DishMainComponent {
  @Input() public dishes: IDish[] = [];

  @Output() deleteDishEvent = new EventEmitter<{ dishDetails: { idMenu: number, idDish: number } }>();
  @Output() editDishEvent = new EventEmitter<{ dishDetails: { idMenu: number, dish: IDish } }>();

  private readonly menuService = inject(ListMenusService);
  private readonly dishService = inject(ListDishService);
    // dishes: IDish[] = [];
    filteredDishes: IDish[] = [];
    filteredMenus: IMenu[] = []; 
    menus: IMenu[] = []; 
    dishMenuMap: Map<number, number> = new Map();

  getHeaders() {
    return [
      { label: 'Plato ID' },
      { label: 'Menu ID' },
      { label: 'Nombre del Plato' },
      { label: 'Precio' },
      { label: 'Descripción' },
      { label: 'Es Popular' },
      { label: 'Acciones' },
    ];
  }

  getActions() {
    return [
      { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
      { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' },
    ];
  }

  openDeleteModal(idMenu: number, idDish: number): void {
    this.deleteDishEvent.emit({ dishDetails: { idMenu, idDish } }); 
  }

  openEditModal(idMenu: number, dish: IDish): void {
    this.editDishEvent.emit({ dishDetails: { idMenu, dish } });
  }

  loadDishes(): void {
    this.filteredDishes = [];
    this.menuService.getMenus().subscribe(
      (menus) => {
        this.menus = menus; 
        this.filteredMenus = menus;

        for (let i = 0; i < this.filteredMenus.length; i++) {
          this.dishService.listDishes(this.filteredMenus[i].idMenu).subscribe(
            (dishes) => {
              dishes.forEach(dish => this.dishMenuMap.set(dish.idDish, this.filteredMenus[i].idMenu));
              this.dishes.push(...dishes); 
              this.filteredDishes = [...this.dishes]; 
            },
            (error) => {
              console.error('Error al cargar los platos:', error);
            }
          );
        }
      });
  }
}
