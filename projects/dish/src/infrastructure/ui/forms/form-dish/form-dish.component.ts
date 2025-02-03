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
import { IDish, IDishResponse } from '../../../../domain/model/dish.model';

@Component({
  selector: 'lib-form-dish',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-dish.component.html',
  styleUrl: './form-dish.component.scss',
})
export class FormDishComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input() public menuId!: number;
  @Input() set dish(value: IDishResponse) {
    this.selectedDish = value;
  }
  @Output() public onSubmit = new EventEmitter<IDish>();
  @Output() public onClose = new EventEmitter<void>();

  selectedDish: IDishResponse | null = null;
  isSubmitted = false;
  faX = faX;
  faPlus = faPlus;
  faEdit = faEdit;

  dishForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedDish) {
      this.dishForm = this.formBuilder.group({
        dishName: [this.selectedDish.dishName, Validators.required],
        description: [this.selectedDish.description, Validators.required],
        basePrice: [this.selectedDish.basePrice, Validators.required],
        isPopular: this.selectedDish.isPopular,
        menuId: this.menuId,
        active: this.selectedDish.active,
      });
    } else {
      this.dishForm = this.formBuilder.group({
        dishName: ['', Validators.required],
        description: ['', Validators.required],
        basePrice: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        isPopular: false,
        menuId: this.menuId,
        active: true,
      });
    }
  }

  get dishNameControl(): FormControl {
    return this.dishForm!.get('dishName') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.dishForm!.get('description') as FormControl;
  }

  get basePriceControl(): FormControl {
    return this.dishForm!.get('basePrice') as FormControl;
  }

  close() {
    this.isSubmitted = false;
    this.dishForm.reset();
    this.onClose.emit();
  }

  submit(event: Event): void {
    event.preventDefault();
    if (!this.dishForm!.valid) {
      this.isSubmitted = true;
      console.log('Formulario no válido');
      return;
    }
    this.onSubmit.emit(this.dishForm.getRawValue() as unknown as IDish);
    this.onClose.emit();
    this.dishForm.reset();
  }
}
