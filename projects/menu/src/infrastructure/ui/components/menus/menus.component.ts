import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IMenuResponse, IMenu } from '../../../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { DeleteCardComponent } from 'shared';
import { Router } from '@angular/router';
import { FormMenuComponent } from '../../forms/form-menu/form-menu.component';

@Component({
  selector: 'lib-menus',
  imports: [FontAwesomeModule, DeleteCardComponent, FormMenuComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  private readonly router = inject(Router);

  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  menus: IMenuResponse[] = [];
  showCreateModal = false;
  showUpdateModal = false;

  @Input() public menus$: Observable<IMenuResponse[]>;
  public currentMenu = input<IMenuResponse>();

  @Output() public onDelete = new EventEmitter<number>();
  @Output() public onSaveMenu = new EventEmitter<IMenu>();
  @Output() public onSelectMenu = new EventEmitter<number>();

  ngOnInit(): void {
    this.menus$.subscribe((menus) => (this.menus = menus));
  }

  showCreateMenu(): void {
    this.onSelectMenu.emit(0);
    this.showCreateModal = true;
  }

  showUpdateMenu(idMenu: number): void {
    this.onSelectMenu.emit(idMenu);
    this.showUpdateModal = true;
  }

  closeModal(): void {
    this.onSelectMenu.emit(0);
    this.showCreateModal = false;
    this.showUpdateModal = false;
  }

  handleSubmit(menu: IMenu): void {
    this.onSaveMenu.emit(menu);
  }

  deleteMenu(idMenu: number): void {
    this.onDelete.emit(idMenu);
  }
}
