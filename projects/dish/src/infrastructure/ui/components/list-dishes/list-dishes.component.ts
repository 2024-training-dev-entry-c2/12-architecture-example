import { Component, input, output, viewChild } from '@angular/core';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';
import { CurrencyPipe, NgFor } from '@angular/common';
import { IDish } from '../../../../domain/model/dish.model';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-list-dishes',
  imports: [ModalComponent, DishFormComponent, NgFor, CurrencyPipe],
  templateUrl: './list-dishes.component.html',
  styleUrl: './list-dishes.component.scss',
})
export class ListDishesComponent {
  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<ModalComponent>('deleteModal');
  public dishes = input.required<IDish[]>();
  public currentDish = input<IDish>();
  public dishToDelete: IDish | null = null;

  public onCreateDish = output<{
    dish: IDish;
    modal: ModalComponent;
  }>();
  public onSelectDish = output<number>();
  public onDeleteDish = output<{
    dishId: number;
    modal: ModalComponent;
  }>();

  handleSubmit(dish: IDish) {
    this.onCreateDish.emit({ dish, modal: this.modal() });
  }

  selectDish(id: number) {
    this.onSelectDish.emit(id);
    this.modal().toggle();
  }

  handleDeleteClick(dish: IDish) {
    this.dishToDelete = dish;
    this.deleteModal().toggle();
  }

  handleConfirmDelete() {
    if (this.dishToDelete) {
      this.onDeleteDish.emit({
        dishId: this.dishToDelete.id,
        modal: this.deleteModal(),
      });
      this.dishToDelete = null;
    }
  }

  handleCancelDelete() {
    this.deleteModal().toggle();
    this.dishToDelete = null;
  }
}
