import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { IDish, IMenu } from '../../../../domain/model/menus.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { DishModalComponent } from "../dish-modal/dish-modal.component";
import { CreateDishUseCase } from '../../../../application/menus/create-dish.usecase';
import { UpdateDishUseCase } from '../../../../application/menus/update-dish.usecase';
import { DeleteDishUseCase } from '../../../../application/menus/delete-dish.usecase';
import { ListMenusUseCase } from '../../../../public-api';

@Component({
  selector: 'lib-main',
  imports: [FormsModule, CommonModule, TitleCasePipe, DishModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private readonly createDishUseCase = inject(CreateDishUseCase);
  private readonly updateDishUseCase = inject(UpdateDishUseCase);
  private readonly deleteDishUseCase = inject(DeleteDishUseCase);
  private readonly listMenusUsecase = inject(ListMenusUseCase);

  public menus = input<IMenu[]>();
  @Output() deleteMenuEvent = new EventEmitter<number>();
  @Output() editMenuEvent = new EventEmitter<IMenu>();
  public selectedMenuId = signal<number | null>(null);

  isModalVisible = false;
  isEditMode = false;
  modalTitle = 'Agregar plato';
  modalButton = 'Agregar';
  currentDish: IDish | null = null;

  getHeaders() {
    return [
      { label: 'Menu ID' },
      { label: 'Nombre del Menu' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return [
      { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
      { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' }
    ]
  }

  onInit(): void {
    this.createDishUseCase.initSubscriptions();
    this.updateDishUseCase.initSubscriptions();
    this.deleteDishUseCase.initSubscriptions();
    this.listMenusUsecase.initSubscriptions();
  }
  onDestroy(): void {
    this.createDishUseCase.destroySubscriptions();
    this.updateDishUseCase.destroySubscriptions();
    this.deleteDishUseCase.destroySubscriptions();
    this.listMenusUsecase.destroySubscriptions();
  }

  loadMenus(): void {
    this.listMenusUsecase.loadMenus();
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  openDeleteModal(idMenu: number): void {
    this.deleteMenuEvent.emit(idMenu);
  }

  openEditModal(menu: IMenu): void {
    this.editMenuEvent.emit(menu);
  }

  openModal(mode: 'add' | 'edit', idMenu: number, dish?: IDish): void {
    this.isModalVisible = true;
    this.isEditMode = mode === 'edit';
    this.modalTitle = this.isEditMode ? 'Editar Plato' : 'Agregar Plato';
    this.modalButton = this.isEditMode ? 'Actualizar' : 'Agregar';
    this.currentDish = dish ? { ...dish } : null;
    this.selectedMenuId.set(idMenu);
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.currentDish = null;
  }

  addDish(menuId: number): void {
    this.openModal('add', menuId);
  }

  editDish(menuId: number, dish: IDish): void {
    this.openModal('edit', menuId, dish);
  }

  submitDish(dish: IDish): void {
    if (this.isEditMode && this.currentDish) {
      this.updateDishUseCase.updateDish(this.selectedMenuId(), this.currentDish.idDish, dish);
      this.loadMenus();
    } else {
      this.createDishUseCase.addDish(this.selectedMenuId(), dish);
      this.loadMenus();
    }
    this.closeModal();
  }

  deleteDish(menuId: number, dishId: number): void {
    this.deleteDishUseCase.deleteDish(menuId, dishId);
    this.loadMenus();
    console.log('Dish deleted' + dishId);
  }

}
