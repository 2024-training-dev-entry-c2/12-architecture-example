import { FormGroup } from "@angular/forms";

export interface IInput {
    id: string,
    label?: string,
    value: string,
    placeholder: string,
    type: string,
    formControlName?: string,
    required?: boolean | true,
    disabled?: boolean | false
}