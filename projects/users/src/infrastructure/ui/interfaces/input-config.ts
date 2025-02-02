export interface InputConfig {
  label: string;
  formControlName: string;
  type: 'text' | 'password' | 'select';
  options?: { value: string, label: string }[];
}