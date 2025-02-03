export interface IControls {
    text: string;
    type: 'input' | 'select' | 'multiselect' | 'textarea';
    inputType?: string;
    controlName: string;
    placeholder: string;
    options?: IOptions[];
}

export interface IOptions {
    name: string;
    value: number;
}