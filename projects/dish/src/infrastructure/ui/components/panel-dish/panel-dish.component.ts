import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Idish } from '../../../../domain/model/dish.model';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { ModalComponent } from 'shared';
import { DishFormComponent } from '../../forms/dishForm/dishForm.component';

@Component({
  selector: 'lib-panel-dish',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, ModalComponent, DishFormComponent],
  templateUrl: './panel-dish.component.html',
  styleUrl: './panel-dish.component.scss',
})
export class PanelDishComponent {
  public isModalForm = false;
  public modal = viewChild<ModalComponent>('modal');
  public currentDish = input<Idish>();
  public allDishes = input<Idish[]>();
  public onCreateDish = output<Idish>();
  public onSelectDish = output<number>();
  public onDeleteDish = output<number>();

  public dishes: Idish[] = [];

  handleSubmit(dish: Idish) {
    this.onCreateDish.emit(dish);
  }

  selectDish(id: number) {
    this.onSelectDish.emit(id);
    console.log('usuario seleccionado', id);
    this.modal().toggle();
  }

  deleteDish(id: number) {
    this.onDeleteDish.emit(id);
  }
}
