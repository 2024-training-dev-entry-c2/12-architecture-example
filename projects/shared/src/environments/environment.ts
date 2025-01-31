export const ENV = {
  BASE_URL: 'http://localhost:8080',
};

export const RESOURCES = {
  CUSTOMERS: `${ENV.BASE_URL}/customers`,
  DISHES: `${ENV.BASE_URL}/dishes`,
  MENUS: `${ENV.BASE_URL}/menus`,
  ORDERS: `${ENV.BASE_URL}/orders`,
  customerById: (id: string) => `${RESOURCES.CUSTOMERS}/${id}`,
  dishById: (id: string) => `${RESOURCES.DISHES}/${id}`,
  menuById: (id: string) => `${RESOURCES.MENUS}/${id}`,
  orderById: (id: string) => `${RESOURCES.ORDERS}/${id}`,
};
