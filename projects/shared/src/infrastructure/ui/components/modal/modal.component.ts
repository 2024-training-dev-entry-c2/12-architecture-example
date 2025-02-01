import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-modal',
  imports: [NgClass, ThemeButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public idModal = input<string>();
  public title = input<string>();
  public action = input<string>();
  public themeButton = input<'success' | "warning" | 'danger' | 'cancel'>();
  public form = input<FormGroup>();
  public onOpen = output<void>();
  public onOpenByBtn = output<void>();
  public onClose = output<void>();
  public visible = false;
  public hasButton = input<boolean>(true);

  toggle(){
    this.visible = !this.visible;
    if(!this.visible){
      this.onClose.emit();
    }else {
      this.onOpen.emit();
    }
  }

  openWithBtn(){
    this.onOpenByBtn.emit();
    this.toggle();
  }
}
