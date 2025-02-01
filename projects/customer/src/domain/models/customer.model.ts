export interface ICustomer {
  customerId: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  orderIds: number[];
}

export interface ICustomerCreateRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}
