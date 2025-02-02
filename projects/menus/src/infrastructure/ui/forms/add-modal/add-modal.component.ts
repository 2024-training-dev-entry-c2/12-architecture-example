import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {

  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();

  menuForm!: FormGroup;

  formFields = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Description', valueLabel: 'description', type: 'text' },
  ];

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData && this.menuForm) {
      this.menuForm.patchValue(this.editData);
    }else{
      this.resetForm();
    }
  }

  private initializeForm(): void {
    this.menuForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
    });

    if (this.editData) {
      this.menuForm.patchValue(this.editData);
    }
  }

  resetForm(): void {
    this.menuForm.reset();
  }

  onSave(): void {
    if (this.menuForm.valid) {
      this.save.emit(this.menuForm.value);
    }
  }

}
