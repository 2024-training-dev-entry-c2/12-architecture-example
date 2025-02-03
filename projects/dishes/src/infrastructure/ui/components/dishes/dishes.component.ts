import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from "shared";
import { IDish } from '../../../../domain/model/dishes.model';
import { DishesFormComponent } from "../../forms/dishes-form/dishes-form.component";
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'lib-dishes',
  imports: [ModalComponent, DishesFormComponent, CurrencyPipe, NgFor],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss',
})
export class DishesComponent {
  public modal = viewChild<ModalComponent>('modal');

  public dishes = input.required<IDish[]>();
  public onCreateDish = output<{dish: IDish; modal: ModalComponent}>(); 
  public onSelectDish = output<string>();
  public currentDish = input<IDish>();
  public onDeleteDish = output<string>();

  handleSubmit(dish: IDish) {
    this.onCreateDish.emit({dish, modal: this.modal()});
  }

  selectDish(id: string){
    this.onSelectDish.emit(id);
    this.modal().toggle();
  }

  deleteDish(id: string){
      this.onDeleteDish.emit(id);
  }
}
