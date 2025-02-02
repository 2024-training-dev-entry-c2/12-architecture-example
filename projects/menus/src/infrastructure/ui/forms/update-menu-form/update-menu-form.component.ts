import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.model';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-update-menu-form',
  imports: [ReactiveFormsModule ,ModalComponent],
  templateUrl: './update-menu-form.component.html',
  styleUrl: './update-menu-form.component.scss',
})
export class UpdateMenuFormComponent {
  @Input() getData: IMenu ;
  @Input() getMenuId: number = 0;
  @Output() updateMenu = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();
  private menuFormBuilder = inject(FormBuilder);
  ngOnInit(): void {
    this.setValue();
  }
  public menuUpdatedForm = this.menuFormBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    dishfoods: this.menuFormBuilder.array([], [Validators.required]),
  });

  setValue(): void {
    if (!this.getData) {
      console.warn('getData is undefined');
      return;
    }
    const dishfoodsArray = this.menuUpdatedForm.get('dishfoods') as FormArray;
    dishfoodsArray.clear();
    if (this.getData.dishfoods && Array.isArray(this.getData.dishfoods) && this.getData.dishfoods.length > 0) {
      this.getData.dishfoods.forEach((dish: any) => {
        dishfoodsArray.push(
          this.menuFormBuilder.control(dish.name, Validators.required)
        );
      });
    }
    if (this.getData.name && this.getData.name != null) {
      this.menuUpdatedForm.patchValue({
        id: this.getData.id,
        name: this.getData.name,
      });
    }
    this.menuUpdatedForm.get('dishfoods')?.disable();
  }
  sendToUpdate() {
    this.updateMenu.emit(
      this.menuUpdatedForm.getRawValue() as unknown as any
    );
    setTimeout(() => {
      this.redirectToMenu();
    }, 1000);
  }
    constructor(private router: Router) {}
    redirectToMenu(): void {
      this.closeModal.emit();
    }
}
