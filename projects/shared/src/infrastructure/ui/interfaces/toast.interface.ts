export interface IToast {
    title: string,
    message: string,
    type: string,
    duration?: number,
    close: boolean | true
}