import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InformativeModalComponent } from 'shared';


interface InputConfig {
  label: string;
  formControlName: string;
  type: 'text' | 'password' | 'select';
  options?: { value: string, label: string }[];
}

@Component({
  selector: 'lib-auth-form',
  imports: [ReactiveFormsModule, InformativeModalComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})



export class AuthFormComponent {
  @Input() title: string = '';
  @Input() buttonText: string = 'Enviar';
  @Input() inputsConfig: InputConfig[] = [];
  @Input() linkText: string = '';
  @Input() linkRoute: string = '';
  @Input() errorMessage: string | null = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() onLinkClick = new EventEmitter<void>();
  authForm: FormGroup = new FormGroup({});
  showModal: boolean = false;
  modalMessage: string = '';

  ngOnInit(): void {
    this.inputsConfig.forEach(input => {
      this.authForm.addControl(input.formControlName, new FormControl('', Validators.required));
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.formSubmit.emit(this.authForm.value);
    }
  }

  handleLinkClick() {
    this.onLinkClick.emit();
  }

  getControl(name: string) {
    return this.authForm.get(name);
  }

  handleModalOpen(message: string) {
    this.showModal = true;
    this.modalMessage = message
  }
}
