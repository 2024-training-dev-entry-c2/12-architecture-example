import { Component, inject } from '@angular/core';
import { SectionMenusComponent } from '../../components/section-menus/section-menus.component';
import { IMenu } from '../../../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { GetMenusUseCase } from '../../../../application/menus/get-menus.usecase';

@Component({
  selector: 'lib-section-menus-content',
  imports: [SectionMenusComponent],
  templateUrl: './section-menus-content.component.html',
})
export class SectionMenusContentComponent {
  private readonly _getMenusUseCase = inject(GetMenusUseCase);
 public menus$: Observable<IMenu[]>;

  ngOnInit(): void {
    this.menus$ = this._getMenusUseCase.menu$();
    this._getMenusUseCase.execute();
  }

  ngOnDestroy(): void {
    this._getMenusUseCase.ngOnDestroy();
  }

}
