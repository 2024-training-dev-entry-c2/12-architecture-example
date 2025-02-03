import { Component, inject, Input, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-form-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss'
})
export class FormMenuComponent implements OnChanges  {
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  @Input() title: string = '';
  @Input() action: string = '';
  @Input() menu: IMenu | null = null;

  @Output() onSubmit = new EventEmitter<IMenu>();

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menu']?.currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.menu) {
      this.form.patchValue(this.menu);
      this.cdr.detectChanges();
    }
  }

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
