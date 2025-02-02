import { IDishes } from "dishes";

export interface IMenu{
    id: number;
    name: string;
    description: string;
    dishes: Array<IDishes>;
}

