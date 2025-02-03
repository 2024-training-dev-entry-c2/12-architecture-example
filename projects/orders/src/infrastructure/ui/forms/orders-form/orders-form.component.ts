import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-orders-form',
  imports: [],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersFormComponent { }
