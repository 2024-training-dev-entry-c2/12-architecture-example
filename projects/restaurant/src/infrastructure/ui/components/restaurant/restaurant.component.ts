import { Component, Input, input } from '@angular/core';
import { IDish, IRestaurant } from '../../../../domain/model/restaurant.model';
import { CurrencyPipe, DatePipe, registerLocaleData, UpperCasePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');
@Component({
  selector: 'lib-restaurant',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent {
 public restaurant = input.required<IRestaurant>();
}
