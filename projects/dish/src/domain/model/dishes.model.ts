export interface IMenu {
    idMenu: number;
    menuName: string;
    dishes: IDish[];
}

export interface IDish {
    idDish: number;
    dishName: string;
    price: number;
    description: string;
}
  
export interface IMenuResponse {
    token: string;
    message: string;
}