import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {
 @Input() menuForm!: FormGroup;
 @Input() formData: { labelName: string; valueLabel: string }[] = [];
 @Output() save = new EventEmitter<void>();
}
