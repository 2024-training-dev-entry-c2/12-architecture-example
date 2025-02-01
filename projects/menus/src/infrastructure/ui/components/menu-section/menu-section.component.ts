import { Component, input, output, viewChild } from '@angular/core';
import { DeleteModalComponent, ModalComponent, SearchBarComponent } from 'shared';
import { MenuBoardComponent } from '../menu-board/menu-board.component';
import { IMenu } from '../../../../domain/model/menu.model';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';

@Component({
  selector: 'lib-menu-section',
  imports: [ModalComponent, MenuFormComponent, DeleteModalComponent, SearchBarComponent, MenuBoardComponent],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss'
})
export class MenuSectionComponent {
    public modalTitle = 'Crear menus';
    public formAction : string = 'Crear';
    public formTheme: 'success' | 'warning' = 'success';
    public isEditing = false;
  
    public modal = viewChild<ModalComponent>('modal');
    public deleteModal = viewChild<DeleteModalComponent>('deleteModal');
    public form = viewChild<MenuFormComponent>('menuForm');
  
    public menus = input.required<IMenu[]>();
    public currentMenu = input.required<IMenu>();
  
    public onSave = output<{menu: IMenu, modal: ModalComponent}>();
    public onSelectToUpdate = output<number>();
    public onDelete = output<number>();
  
    public filteredmenus: IMenu[] = [];  
  
    handleFilteredData(data: IMenu[]): void {
      this.filteredmenus = data;
    }
  
    handleSubmit(menu : IMenu) {
      this.onSave.emit({menu, modal: this.modal()});
    }
  
    handleCloseModal(){
      this.form().resetForm();
    }
  
    selectMenuToUpdate(id:number){
      this.isEditing = true;
      this.modalTitle = 'Actualizar menús';
      this.formAction = 'Actualizar';
      this.formTheme = 'warning';
  
      this.onSelectToUpdate.emit(id);
      this.modal().toggle();
    }
  
    selectMenuToDelete(id:number){
      this.deleteModal().openDeleteModal(id);
    }
  
    handleDelete(id: number){
      this.onDelete.emit(id);
    }
  
    openCreateModal() {
      this.isEditing = false;
      this.modalTitle = 'Crear menú';
      this.formAction = 'Crear';
      this.formTheme = 'success';
    }
}
