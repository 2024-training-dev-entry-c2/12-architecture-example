export interface IMenu {
    idMenu: number;
    menuName: string;
    dishes: IDish[];
}

export interface IDish {
    idDish: number;
    dishName: string;
}
  
export interface IMenuResponse {
    token: string;
    message: string;
}