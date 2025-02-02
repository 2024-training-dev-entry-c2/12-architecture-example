import { Component, inject, input, output, viewChild } from '@angular/core';
import { ButtonComponent, ModalComponent } from 'shared';
import { IAddMenuResponse, IDish } from '../../../../domain/model/menu.model';
import { MenuState } from '../../../../domain/state/menu.state';
import { AddDishComponent } from '../../forms/add-dish.component';

@Component({
  selector: 'lib-get-dishes',
  imports: [ButtonComponent, ModalComponent, AddDishComponent],
  templateUrl: './get-dishes.component.html',
  styleUrl: './get-dishes.component.scss',
})
export class GetDishesComponent {
  public menu = input.required<IAddMenuResponse>();
  private menuState = inject(MenuState);
  public modal = viewChild<ModalComponent>('modal');
  public dishes = input<IDish[]>();
  public onCreateDish = output<{ dish: IDish; modal: ModalComponent }>();
  public onSelectDish = output<number>();
  public dishEdit = input<IDish>();


  message(): string {
    return this.menuState.store().successMessage.snapshot();
  }
  editDish(id: number){
    this.onSelectDish.emit(id);
    this.modal().toggle();
  }
  handleSubmit(dish: IDish) {
    this.onCreateDish.emit({ dish, modal: this.modal() });
  }
}
