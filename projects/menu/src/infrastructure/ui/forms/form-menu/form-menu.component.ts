import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from 'shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IMenu, IMenuResponse } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-form-menu',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss',
})
export class FormMenuComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input() set menu(value: IMenuResponse) {
    this.selectedMenu = value;
  }
  @Output() public onSubmit = new EventEmitter<IMenu>();
  @Output() public onClose = new EventEmitter<void>();

  selectedMenu: IMenuResponse | null = null;
  isSubmitted = false;
  faX = faX;
  faPlus = faPlus;
  faEdit = faEdit;

  menuForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedMenu) {
      this.menuForm = this.formBuilder.group({
        menuName: [this.selectedMenu.menuName, Validators.required],
        description: [this.selectedMenu.description, Validators.required],
        active: this.selectedMenu.active,
      });
    } else {
      this.menuForm = this.formBuilder.group({
        menuName: ['', Validators.required],
        description: ['', Validators.required],
        active: true,
      });
    }
  }

  get menuNameControl(): FormControl {
    return this.menuForm!.get('menuName') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.menuForm!.get('description') as FormControl;
  }

  close() {
    this.isSubmitted = false;
    this.menuForm.reset();
    this.onClose.emit();
  }

  submit(event: Event): void {
    event.preventDefault();
    if (!this.menuForm!.valid) {
      this.isSubmitted = true;
      console.log('Formulario no válido');
      return;
    }
    this.onSubmit.emit(this.menuForm.getRawValue() as unknown as IMenu);
    this.onClose.emit();
    this.menuForm.reset();
  }
}
