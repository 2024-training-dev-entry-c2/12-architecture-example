import { Component, Input, Output, EventEmitter, InputSignal, input } from '@angular/core';

import { BoxComponent } from 'shared';
import { IDish } from '../../../../domain/model/dishes.model';

@Component({
  selector: 'lib-view-dishes',
  imports: [BoxComponent],
  templateUrl: './view-dishes.component.html',
  styleUrl: './view-dishes.component.scss'
})
export class ViewDishesComponent {

    @Input() dishes: IDish[] = [];
    @Output() onDeleteDishes : EventEmitter<IDish> = new EventEmitter<IDish>();
    public headers: InputSignal<string[]> = input.required<string[]>();

    handleDelete(dish : IDish){
      this.onDeleteDishes.emit(dish);
    }
}
