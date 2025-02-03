import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-dishes-list',
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss'
})
export class DishesListComponent {
  public dishes = input<IDish[]>();
}
