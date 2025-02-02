import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormMenuComponent } from '../../forms/form-menu/form-menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.model';
import { GetByIdMenuUseCase } from '../../../../application/get-by-id-menu.useCase';
import { Observable, of } from "rxjs";
import { AsyncPipe, NgIf } from '@angular/common';
import { UpdateMenuUseCase } from '../../../../application/update-menu.useCase';
import { RegisterMenuUseCase } from '../../../../application/register-menu.useCase';

@Component({
  selector: 'lib-form-menu-container',
  imports: [FormMenuComponent, AsyncPipe, NgIf],
  templateUrl: './form-menu-container.component.html',
  styles: ''
})
export class FormMenuContainerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getMenuByIdUseCase = inject(GetByIdMenuUseCase);
  private updateMenuUseCase = inject(UpdateMenuUseCase);
  private createMenuUseCase = inject(RegisterMenuUseCase);

  public idMenu?: number;
  public menu: IMenu;
  menu$!: Observable<IMenu>;

  public title: string;
  public action: string;

  ngOnInit(): void {
    this.updateMenuUseCase.initSubscriptions();
    this.getMenuByIdUseCase.initSubscriptions();
    this.createMenuUseCase.initSubscriptions();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idMenu = +idParam;
        this.action = 'update';
        this.title = 'Actualizar Menú';
        this.loadMenuData(this.idMenu);
      } else {
        this.menu$ = of({} as IMenu);
        this.action = 'save';
        this.title = 'Registrar Menú';
      }
    });
  }

  ngOnDestroy(): void {
    this.updateMenuUseCase.destroySubscriptions();
    this.getMenuByIdUseCase.destroySubscriptions();
    this.createMenuUseCase.destroySubscriptions();
  }

  private loadMenuData(id: number): void {
    this.getMenuByIdUseCase.execute(id);
    this.menu$ = this.getMenuByIdUseCase.menu$();
  }

  handleSubmit(menu: IMenu) {
    if (this.action === 'update') {
      this.updateMenuUseCase.execute(this.idMenu, menu).subscribe({
        next: () => this.router.navigate(['menus']),
        error: (err) => console.error('Error al actualizar el menú', err),
      });
    } else {
      this.createMenuUseCase.execute(menu).subscribe({
        next: () => this.router.navigate(['menus']),
        error: (err) => console.error('Error al registrar el menú', err),
      });
    }
  }
}
