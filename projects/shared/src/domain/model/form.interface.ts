export interface FormField {
    label: string;         // Etiqueta del campo
    type: string;          // Tipo de input (text, email, password, etc.)
    name: string;          // Nombre del control en el formulario
    placeholder?: string;  // Placeholder opcional
    validators?: any[]; 
    value:any; 
    disable:boolean;  // Validadores para el campo
  }