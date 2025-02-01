export const environment = {
    apiUrl: 'http://localhost:8080/api/v1',
};

export const urlResources = {
    clients: `${environment.apiUrl}/clients`,
    handleClientById: (id: number) => `${environment.apiUrl}/clients/${id}`,
    menu: `${environment.apiUrl}/menus`,
    handleMenuById: (id: number) => `${environment.apiUrl}/menus/${id}`,
    orders: `${environment.apiUrl}/orders`,
    handleOrderById: (id: number) => `${environment.apiUrl}/orders/${id}`,
    dishes: `${environment.apiUrl}/dishes`,
    handleDishById: (id: number) => `${environment.apiUrl}/dishes/${id}`,
}
