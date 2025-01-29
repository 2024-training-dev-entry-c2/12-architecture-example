import { Component, Input } from '@angular/core';
import { IMenu } from '../../../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-section-menus',
  imports: [CommonModule],
  templateUrl: './section-menus.component.html',
  styleUrl: './section-menus.component.scss'
})
export class SectionMenusComponent {

 @Input() menus$!: Observable<IMenu[]>;
  

  openEditModal(menu: IMenu): void {
    console.log('Edit client:', menu);
 
  }

  openAddModal(menu: IMenu): void {
    console.log('Edit client:', menu);
 
  }


  openDeleteModal(menu: IMenu): void {
    console.log('Delete client:', menu);
    
  }

  tableContent = () => ['Menu ID', 'Name', 'Description', 'Dishes', 'Actions'];
}
