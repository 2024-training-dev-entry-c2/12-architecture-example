import { Component, input, output, viewChild } from '@angular/core';
import { DeleteModalComponent, ModalComponent, SearchBarComponent } from 'shared';
import { DishBoardComponent } from '../dish-board/dish-board.component';
import { IDish } from '../../../../domain/model/dish.model';
import { IMenu } from 'menus';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';

@Component({
  selector: 'lib-dishes-section',
  imports: [ModalComponent, DishFormComponent, DeleteModalComponent, SearchBarComponent, DishBoardComponent ],
  templateUrl: './dishes-section.component.html',
  styleUrl: './dishes-section.component.scss'
})
export class DishesSectionComponent {
  public modalTitle = 'Crear Plato';
  public formAction : string = 'Crear';
  public formTheme: 'success' | 'warning' = 'success';
  public isEditing = false;

  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<DeleteModalComponent>('deleteModal');
  public form = viewChild<DishFormComponent>('dishForm');

  public dishes = input.required<IDish[]>();
  public menus = input.required<IMenu[]>();
  public currentDish = input.required<IDish>();

  public onSave = output<{dish: IDish, modal: ModalComponent}>();
  public onSelectToUpdate = output<number>();
  public onDelete = output<number>();

  public filteredDishes: IDish[] = [];  

  handleFilteredData(data: IDish[]): void {
    this.filteredDishes = data;
  }

  handleSubmit(dish : IDish) {
    this.onSave.emit({dish, modal: this.modal()});
  }

  handleCloseModal(){
    this.form().resetForm();
  }

  selectDishToUpdate(id:number){
    this.isEditing = true;
    this.modalTitle = 'Actualizar Plato';
    this.formAction = 'Actualizar';
    this.formTheme = 'warning';

    this.onSelectToUpdate.emit(id);
    this.modal().toggle();
  }

  selectDishToDelete(id:number){
    this.deleteModal().openDeleteModal(id);
  }

  handleDelete(id: number){
    this.onDelete.emit(id);
  }

  openCreateModal() {
    this.isEditing = false;
    this.modalTitle = 'Crear Plato';
    this.formAction = 'Crear';
    this.formTheme = 'success';
  }
}
