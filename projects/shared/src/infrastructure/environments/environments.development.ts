export const environment = {
  apiUrl: 'http://localhost:8080/api/v1'
};

export const urlResources = {
  customers: `${environment.apiUrl}/customer`,
  dishes: `${environment.apiUrl}/dishes`,
  menu: `${environment.apiUrl}/menu`,
  orders: `${environment.apiUrl}/orders`

}
