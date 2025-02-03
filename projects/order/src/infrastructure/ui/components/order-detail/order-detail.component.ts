import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrderDetailResponse } from '../../../../domain/model/order.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-order-detail',
  imports: [FontAwesomeModule, DecimalPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  faX = faX;

  @Input() public orderDetails!: IOrderDetailResponse[];
  @Output() public closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
