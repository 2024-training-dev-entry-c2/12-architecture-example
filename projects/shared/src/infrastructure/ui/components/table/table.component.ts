import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'lib-table',
  imports: [ButtonsComponent, CurrencyPipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() isError: string = '';
  @Output() deleteId = new EventEmitter<number>(); 
  @Output() updateId = new EventEmitter<number>(); 

  images = [
  'assets/icons/form-svgrepo-com.svg#icon-delete',  
  'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  get columnKeys(): string[] {
   
    return this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  deleteData(id: number): void {
    console.log(id);
    this.deleteId.emit(id);
  }
  updateData(id: number): void {
    console.log(id);
    this.updateId.emit(id);
  }
}
