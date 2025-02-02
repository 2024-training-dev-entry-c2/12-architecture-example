
export interface IMenu {
  id: number;
  name: string;
  dishes?: IDish[]; 
}

export interface IDish {
  id?: number;
  name: string;
  description: string;
  price: number;
  specialDish?: boolean;
  menu?: {
      id:number;
      name: string;
  }
}
