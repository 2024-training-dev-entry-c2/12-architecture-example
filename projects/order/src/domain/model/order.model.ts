export interface IOrder {
    id?: number;
    clientId: string;
    dishes?: {
      id: number;
      name: string;
      description: string;
      price: number;
      specialDish?: boolean;
    }[];
    total?: number;
  }

export interface IDish {
  id?: number;
  name: string;
  description: string;
  price: number;
  specialDish?: boolean;
  menu?: {
      id:number;
      name: string;
  }
}

export interface IClient {
  id: number;
  name: string;
  lastName: string;
  email: string;
  frequent?: boolean;
}