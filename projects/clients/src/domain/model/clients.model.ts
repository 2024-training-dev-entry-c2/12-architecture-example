export interface IClient {
    find(arg0: (client: any) => boolean): unknown;
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    type?: string;
}