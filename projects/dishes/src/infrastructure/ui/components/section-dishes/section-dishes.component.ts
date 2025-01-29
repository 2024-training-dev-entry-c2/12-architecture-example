import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IDishes } from '../../../../domain/model/dishes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-section-dishes',
  imports: [CommonModule],
  templateUrl: './section-dishes.component.html',
  styleUrl: './section-dishes.component.scss'
})
export class SectionDishesComponent {

 @Input() dishes$!: Observable<IDishes[]>;
  

  openEditModal(dish: IDishes): void {
    console.log('Edit client:', dish);
 
  }

  openAddModal(dish: IDishes): void {
    console.log('Edit client:', dish);
 
  }


  openDeleteModal(dish: IDishes): void {
    console.log('Delete client:', dish);
    
  }

  tableContent = () => ['ID', 'Name', 'Email', 'Total Orders', 'User Type', 'Actions'];

}
