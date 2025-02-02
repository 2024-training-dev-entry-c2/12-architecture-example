import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDish } from '../../../../domain/model/dish.model';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'lib-get-all-dish-comp',
  imports: [RouterLink,CurrencyPipe ],
  templateUrl: './get-all-dish-comp.component.html',
  styleUrl: './get-all-dish-comp.component.scss'
})
export class GetAllDishCompComponent {
  dishes = input<IDish[]>();
  items = input<string[]>();
  public onDeleteDish = output<number>();
  public onUpdateDish = output<number>();

  // private router = inject(Router);

  deleteDish(id: number) {
    this.onDeleteDish.emit(id);
  }

  updateDish(id: number) {
    this.onUpdateDish.emit(id);
  }
}
