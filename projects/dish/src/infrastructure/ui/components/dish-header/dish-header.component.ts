import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from "shared";
import { DishFormComponent } from "../../forms/dish-form/dish-form.component";
import { IDish } from '../../../../domain/model/dishes.model';

@Component({
  selector: 'lib-dish-header',
  imports: [HeaderComponent, DishFormComponent],
  templateUrl: './dish-header.component.html',
  styleUrl: './dish-header.component.scss'
})
export class DishHeaderComponent {
  @Output() onSubmitDish = new EventEmitter<IDish>();
  @ViewChild(DishFormComponent) dishForm!: DishFormComponent;

  submitDish(): void {
    if (this.dishForm && this.dishForm.form.valid) {
      const dish = this.dishForm.getFormData();
      if (dish) {
        console.log('Sending dish data:', dish);
        this.onSubmitDish.emit(dish);
        this.dishForm.resetForm();
      }
    }
  }
}
