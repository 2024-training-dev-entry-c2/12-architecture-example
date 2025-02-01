export interface IRestaurant {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  openingHours: [number, number];
  closingHours: [number, number];
  menuRestaurant: IAddMenuResponse;
}
export interface IAddMenuResponse {
  id: number,
  description: string,
  dishes: IDish[]
}
export interface IDish {
  id: number,
  name: string;
  price: number;
  popular: boolean;
  menuRestaurantId?: number;
}
