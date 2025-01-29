import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../model/form.interface';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'lib-modal',
  imports: [FormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() data: any= [];
  @Output() closeModal = new EventEmitter<void>();
  @Input() formGroup!: FormGroup; 
  fields: FormField[] = []; 

  ngOnInit(): void {
    console.log("Valor de this.data:", this.data);
    
    if (this.data != null) {
        this.fields = this.generateFieldsFromJson(this.data);
    } else {
        this.fields = [];
    }
  
    console.log(this.fields);
      
  }

  get columnKeys(): string[] {
    return this.data!=null ? Object.keys(this.data) : [];
  }

  
  close() {
    this.closeModal.emit();
    console.log(this.data);
    
  }
 

  generateFieldsFromJson(json: any): FormField[] {
    return Object.entries(json).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      type: this.getFieldType(key, value),
      name: key,
      value: Array.isArray(value) ? value.join(', ') : value,
      validators: this.getValidatorsForKey(key), 
      disable: key == 'id'? true : false,
    }));
  }
  private getFieldType(key: string, value: any): string {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) return 'text'; 
    return 'text';
  }

  // Opcional: Determinar validadores según clave o regla
  private getValidatorsForKey(key: string): any[] {
    if (key === 'email') return [Validators.required, Validators.email];
    if (key === 'name') return [Validators.required, Validators.minLength(3)];
    return [];
  }
}
