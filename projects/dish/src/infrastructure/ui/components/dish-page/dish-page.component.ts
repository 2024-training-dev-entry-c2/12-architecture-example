import { CommonModule } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { IDish, IMenu } from '../../../../domain/model/dish.model';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';

@Component({
  selector: 'lib-dish-page',
  imports: [ModalComponent, CommonModule, DishFormComponent],
  templateUrl: './dish-page.component.html',
  styleUrl: './dish-page.component.scss'
})
export class DishPageComponent {
    public modal = viewChild<ModalComponent>('modal');
    public dishes = input<IDish[]>();
    public menus = input<IMenu[]>();
    public currentDish = input<IDish>();
    public onCreateDish = output<{dish: IDish; modal: ModalComponent}>();
    public onSelectDish = output<number>();
    public onDelete = output<number>();
    public onGetMenus = output <IMenu[]>();

  
    handleSubmit(dish: IDish) {
      this.onCreateDish.emit({dish, modal: this.modal()});
      this.modal().toggle();
    }
  
    selectDish(id: number) {
      this.onSelectDish.emit(id);
      this.modal().toggle();
    }
  
    deleteDish(dishId: number): void {
      this.onDelete.emit(dishId);
    }

    // getMenus(){
    //   this.onGetMenus.emit(this.menus)
    // }
}
