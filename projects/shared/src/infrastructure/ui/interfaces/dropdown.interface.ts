export interface IDropdown {
    id: string,
    label?: string,
    options: { label: string; value: any }[],
    formControlName?: string,
    required?: boolean | true,
    disabled?: boolean | false
}