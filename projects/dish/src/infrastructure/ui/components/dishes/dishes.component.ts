import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IDishResponse, IDish } from '../../../../domain/model/dish.model';
import { Observable } from 'rxjs';
import { DeleteCardComponent } from 'shared';
import { DecimalPipe } from '@angular/common';
import { IMenuResponse } from 'menu';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'lib-dishes',
  imports: [FontAwesomeModule, DeleteCardComponent, DecimalPipe],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss',
})
export class DishesComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  dishes: IDishResponse[][] = [];
  menus: IMenuResponse[] = [];
  showCreateModal = false;
  showUpdateModal = false;

  @Input() public dishes$: Observable<IDishResponse[][]>;
  @Input() public menus$: Observable<IMenuResponse[]>;
  public currentDish = input<IDishResponse>();

  @Output() public onDelete = new EventEmitter<number>();
  @Output() public onSaveDish = new EventEmitter<IDish>();
  @Output() public onSelectDish = new EventEmitter<{
    id: number;
    index: number;
  }>();

  ngOnInit(): void {
    this.menus$.subscribe((menus) => (this.menus = menus));
    this.dishes$.subscribe((dishes) => (this.dishes = dishes));
  }

  showCreateDish(): void {
    this.onSelectDish.emit({ id: 0, index: 0 });
    this.showCreateModal = true;
  }

  showUpdateDish(idDish: number, index: number): void {
    this.onSelectDish.emit({ id: idDish, index: index });
    this.showUpdateModal = true;
  }

  closeModal(): void {
    this.onSelectDish.emit({ id: 0, index: 0 });
    this.showCreateModal = false;
    this.showUpdateModal = false;
  }

  handleSubmit(dish: IDish): void {
    this.onSaveDish.emit(dish);
  }

  deleteDish(idDish: number): void {
    this.onDelete.emit(idDish);
  }
}
