import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menus.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public menus = input<IMenu[]>();
  @Output() deleteMenuEvent = new EventEmitter<number>();
  @Output() editMenuEvent = new EventEmitter<IMenu>();

  getHeaders() {
    return [
      { label: 'Menu ID' },
      { label: 'Nombre del Menu' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return [
      { label: 'Editar', link: '/edit', type: 'edit', icon: 'svg/edit.svg#edit' },
      { label: 'Eliminar', link: '/delete', type: 'delete', icon: 'svg/delete.svg#delete' }
    ]
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  openDeleteModal(idMenu: number): void {
    this.deleteMenuEvent.emit(idMenu);
  }

  openEditModal(menu: IMenu): void {
    this.editMenuEvent.emit(menu);
  }

}
