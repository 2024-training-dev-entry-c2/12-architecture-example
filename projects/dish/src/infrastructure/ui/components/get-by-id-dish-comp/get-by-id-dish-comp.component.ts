import { Component,Input } from '@angular/core';
import { IDish } from '../../../../domain/model/dish.model';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'lib-get-by-id-dish-comp',
  imports: [CurrencyPipe],
  templateUrl: './get-by-id-dish-comp.component.html',
  styleUrl: './get-by-id-dish-comp.component.scss'
})
export class GetByIdDishCompComponent {
@Input() dish!: IDish;
}
