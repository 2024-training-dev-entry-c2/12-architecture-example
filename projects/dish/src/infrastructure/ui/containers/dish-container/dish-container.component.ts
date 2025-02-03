import { Component, inject, signal, ViewChild } from '@angular/core';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ListDishesUseCase } from '../../../../application/dishes/list-dishes.usecase';
import { CreateDishUseCase } from '../../../../application/dishes/create-dish.usecase';
import { UpdateDishUseCase } from '../../../../application/dishes/update-dish.usecase';
import { DeleteDishUseCase } from '../../../../application/dishes/delete-dish.usecase';
import { SearchDishesUseCase } from '../../../../application/dishes/search-dish.usecase';
import { DishHeaderComponent } from "../../components/dish-header/dish-header.component";
import { ShareComponent } from "shared";
import { DishMainComponent } from "../../components/dish-main/dish-main.component";
import { ModalComponent } from "shared";
import { AsyncPipe, CommonModule } from '@angular/common';
import { IDish } from '../../../../domain/model/dishes.model';
import { IMenu, ListMenusService, ListMenusUseCase } from 'menu';
import { ListDishService } from '../../../services/list-dish.service';

@Component({
  selector: 'lib-dish-container',
  imports: [DishHeaderComponent, ShareComponent, DishMainComponent, ModalComponent, DishFormComponent,  CommonModule, AsyncPipe],
  templateUrl: './dish-container.component.html'
})
export class DishContainerComponent {
  private readonly _listUsecase = inject(ListDishesUseCase);
  private readonly _createUsecase = inject(CreateDishUseCase);
  private readonly _searchUsecase = inject(SearchDishesUseCase);
  private readonly _deleteUsecase = inject(DeleteDishUseCase);
  private readonly _updateUsecase = inject(UpdateDishUseCase);
  private readonly _listMenusUsecase = inject(ListMenusUseCase);
  private readonly _listDishService = inject(ListDishesUseCase);
  private readonly menuService = inject(ListMenusService);
  private readonly dishService = inject(ListDishService);
 
  public dish$: Observable<IDish[]>;
  
  filteredDishes: IDish[] = [];
  filteredMenus: IMenu[] = []; 
  menus: IMenu[] = []; 
  dishMenuMap: Map<number, number> = new Map();

  public isModalOpen = signal<boolean>(false);
  public selectedDishId = signal<number | null>(null);

  public modalTitle: string = '';
  public modalContent: string = '';
  public modalButton: string = '';

  public currentDishName = '';
  public currentPrice = 0;
  public currentDescription = '';
  public modalType: string = '';
  public menuId: number | null = null;

  @ViewChild(DishFormComponent) dishEditForm!: DishFormComponent;

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    // this.loadAllDishes();
    this.dish$ = this._searchUsecase.filteredDishes$();
    this.dish$ = this._listUsecase.dish$();
  }

  ngOnDestroy(): void {
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
  }

  loadDishes(): void {
    this._listUsecase.loadDishes(this.menuId);
  }
  

  addDish(dish: IDish): void {
    if (this.menuId) {
      this._createUsecase.addDishToMenu(this.menuId, dish);
    }
  }

  updateSearchQuery(query: string): void {
    this._searchUsecase.setSearchQuery(query);
  }

  openDeleteModal(event: { dishDetails: { idMenu: number, idDish: number } }): void {
    const { dishDetails } = event;
    this.selectedDishId.set(dishDetails.idDish);
    this.menuId = dishDetails.idMenu;
    this.modalTitle = 'Confirmar Eliminación';
    this.modalButton = 'Confirmar';
    this.modalType = 'delete';
    this.isModalOpen.set(true);
  }

  openEditModal(event: { dishDetails: { idMenu: number, dish: IDish } }): void {
    const { dishDetails } = event; 
    this.selectedDishId.set(dishDetails.dish.idDish);
    this.menuId = dishDetails.idMenu;
    this.modalTitle = 'Editar Plato';
    this.modalButton = 'Actualizar';
    this.currentDishName = dishDetails.dish.dishName;
    this.currentPrice = dishDetails.dish.price;
    this.currentDescription = dishDetails.dish.description;
    this.modalType = 'edit';
    this.isModalOpen.set(true);
  } 
  

  confirmModal(): void {
    if (this.modalType === 'delete') {
      this.deleteDish();
    } else if (this.modalType === 'edit' && this.dishEditForm) {
      const updatedDish = this.dishEditForm.getFormData();
      if (updatedDish) {
        this.updateDish(updatedDish);
      }
    }
    this.isModalOpen.set(false);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  private deleteDish(): void {
    const dishId = this.selectedDishId();
    if (dishId) {
      this._deleteUsecase.deleteDishFromMenu(this.menuId, dishId)
        this.loadDishes();
    }
  }

  private updateDish( updatedDish: IDish): void {
    const dishId = this.selectedDishId();
    if (dishId) {
      this._updateUsecase.updateDishInMenu(this.menuId, dishId, updatedDish)
        this.loadDishes();
    }
  }
}
