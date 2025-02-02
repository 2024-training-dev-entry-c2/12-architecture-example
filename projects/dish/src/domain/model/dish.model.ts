export interface IDishResponse {
  id: number;
  dishName: string;
  description: string;
  basePrice: number;
  isPopular: boolean;
  active: boolean;
}

export interface IDish {
  dishName: string;
  description: string;
  basePrice: number;
  isPopular: boolean;
  menuId: number;
  active: boolean;
}
