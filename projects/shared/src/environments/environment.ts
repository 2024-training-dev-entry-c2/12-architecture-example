export const environment = {
  production: false,
  adminUsername: 'admin',
  adminPassword: '1234*Gufi',
  apiUrl: 'http://localhost:8080/api',
};

export const urlResources = {
  customer: `${environment.apiUrl}/client`,
  customerOperationsById: (id: number) => `${environment.apiUrl}/client/${id}`,
  menu: `${environment.apiUrl}/menu`,
  menuOperationsById: (id: number) => `${environment.apiUrl}/menu/${id}`,
  dish: `${environment.apiUrl}/dish`,
  dishOperationsById: (id: number) => `${environment.apiUrl}/dish/${id}`,
  order: `${environment.apiUrl}/order`,
  orderOperationsById: (id: number) => `${environment.apiUrl}/order/${id}`,
};
