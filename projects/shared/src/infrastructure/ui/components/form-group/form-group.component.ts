import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
})
export class FormGroupComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() id!: string;
  @Input() isSubmitted: boolean = false;
}
