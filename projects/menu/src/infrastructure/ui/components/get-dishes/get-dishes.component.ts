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
  public onCreateDish = output<{ dish: IDish; modal: ModalComponent }>();
  public dishes = input<IDish[]>();


  message(): string {
    return this.menuState.store().successMessage.snapshot();
  }
  handleSubmit(dish: IDish) {
    this.onCreateDish.emit({ dish, modal: this.modal() });
  }
}
