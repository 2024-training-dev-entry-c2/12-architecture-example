import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomer } from 'customers';
import { CommonModule } from '@angular/common';
import { BoxCardComponent } from '../box-card/box-card.component';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-box',
  imports: [CommonModule, BoxCardComponent],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {

  @Input() columns: string[] = [];
  @Input() customers?: ICustomer[];
  @Input() dishes?: IDish[];
  @Input({transform: booleanAttribute}) isCustomers: boolean = false;
  @Input({transform: booleanAttribute}) isDishes: boolean = false;
  @Output() onDeleteCustomer : EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() onDeleteDishes : EventEmitter<IDish> = new EventEmitter<IDish>();

  sendCustomer(event: ICustomer) {
    console.log(event);
    this.onDeleteCustomer.emit(event);
  }

  sendDishes(event: IDish) {
    console.log(event);
    this.onDeleteDishes.emit(event);
  }

}
