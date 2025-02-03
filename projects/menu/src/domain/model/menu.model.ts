// import {IDish} from '../../../../dish/src/domain/model/dish.model';
import { IDish } from "dish";

export interface IMenu {
    id?: number;
    nombre: string;
    platos?: IDish[];
}