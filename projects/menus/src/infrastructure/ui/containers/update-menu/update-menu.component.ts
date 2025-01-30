import { Component, inject } from '@angular/core';
import { UpdateMenuUsecase } from '../../../../application/menus/update-menus.usecase';
import { GetMenuUsecase } from '../../../../application/menus/get-menu.usecase';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { UpdateMenuFormComponent } from '../../forms/update-menu-form/update-menu-form.component';

@Component({
  selector: 'lib-update-menu',
  imports: [UpdateMenuFormComponent],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.css'
})
export class UpdateMenuComponent {
private readonly __useCaseUpdate = inject(UpdateMenuUsecase);
private readonly __useCaseGet = inject(GetMenuUsecase);
  menu: IMenu | null = null;
  menuId: number = 0;
  constructor(private route: ActivatedRoute) {}
    private readonly destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.menuId = this.route.snapshot.params['id'];
    this.getMenu(this.menuId);
  }
  getMenu(id: number) {
    this.__useCaseGet.execute(id).subscribe({
      next: (menu: any) => {
        this.menu = menu;
        console.log(menu);
      },
      error: (err) => {
        console.error('Error al obtener menu:', err);
      },
    });
  }
  UpdateMenu(user: any) {
    this.__useCaseUpdate.execute(user, this.menuId);
    this.menu = null;
  } 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
