export const environment = {
  apiUrl: 'http://localhost:8080/api',
};

export const urlResources = {
  menu: {
    baseUrl: `${environment.apiUrl}/menus`,
    operationsById: (id: number) => `${environment.apiUrl}/menus/${id}`,
  },
  client:{
    baseUrl: `${environment.apiUrl}/clientes`,
    operationsById: (id: number) => `${environment.apiUrl}/clientes/${id}`,
  }
};
