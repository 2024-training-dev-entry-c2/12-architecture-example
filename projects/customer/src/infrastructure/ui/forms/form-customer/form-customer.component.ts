import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
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
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ICustomer,
  ICustomerResponse,
} from '../../../../domain/model/customer.model';

@Component({
  selector: 'lib-form-customer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-customer.component.html',
  styleUrl: './form-customer.component.scss',
})
export class FormCustomerComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input() public selectedCustomer: ICustomerResponse | null = null;

  @Output() public onSubmit = new EventEmitter<ICustomer>();
  @Output() public clearSelected = new EventEmitter<void>();

  isSubmitted = false;
  faX = faX;
  faPlus = faPlus;

  customerForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedCustomer) {
      this.customerForm = this.formBuilder.group({
        name: [this.selectedCustomer.name, Validators.required],
        lastName: [this.selectedCustomer.lastName, Validators.required],
        email: [
          this.selectedCustomer.email,
          [Validators.required, Validators.email],
        ],
        phone: [
          this.selectedCustomer.phone,
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        address: [this.selectedCustomer.address, Validators.required],
        isFrequent: this.selectedCustomer.isFrequent,
      });
    } else {
      this.customerForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', Validators.required],
        isFrequent: false,
      });
    }
  }

  get nameControl(): FormControl {
    return this.customerForm!.get('name') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.customerForm!.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.customerForm!.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.customerForm!.get('phone') as FormControl;
  }

  get addressControl(): FormControl {
    return this.customerForm!.get('address') as FormControl;
  }

  @ViewChild('saveCustomerModal')
  saveCustomerModal!: ElementRef<HTMLDialogElement>;

  open() {
    this.saveCustomerModal.nativeElement.showModal();
  }

  close() {
    this.saveCustomerModal.nativeElement.close();
  }

  xclose(): void {
    this.clearSelected.emit();
  }

  submit(event: Event): void {
    event.preventDefault();
    if (!this.customerForm!.valid) {
      this.isSubmitted = true;
      return;
    }
    this.onSubmit.emit(this.customerForm.getRawValue() as unknown as ICustomer);
    this.saveCustomerModal.nativeElement.close();
  }
}
