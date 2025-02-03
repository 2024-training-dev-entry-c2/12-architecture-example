export interface IClient {
    idClient: number;
    clientName: string;
    email: string;
    phoneNumber: string;
    address: string;
    registrationDate: Date;
    frequentUser: boolean;
    vip: boolean;
}

export interface IClientResponse {
    token: string;
    message: string;
}