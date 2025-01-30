import { Component, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = 'Header'; 
  @Input() buttonText: string = 'Acción'; 
  @Input() iconPath: string = 'svg/plus.svg#plus';
  @Input() modalContent!: TemplateRef<any>; 
  @Output() actionConfirmed = new EventEmitter<void>(); 

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: this.buttonText,
        buttonName: 'Confirmar',
      })
      .subscribe(() => {
        this.actionConfirmed.emit();
      });
  }
}
