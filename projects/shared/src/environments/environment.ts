export const environment = {
    apiUrl: 'http://localhost:8080/api',
};

export const urlResources = {
    clients: `${environment.apiUrl}/clientes`,
    clientOperationsById: (id:string) =>`${environment.apiUrl}/clientes/${id}`,
    dishes: `${environment.apiUrl}/platos`,
    dishesOperationsById: (id:string) =>`${environment.apiUrl}/platos/${id}`,
    menus: `${environment.apiUrl}/menus`,
    menusOperationsById: (id:string) =>`${environment.apiUrl}/menus/${id}`,
    orders: `${environment.apiUrl}/pedidos`,
    ordersOperationsById: (id:string) =>`${environment.apiUrl}/pedidos/${id}`,
}