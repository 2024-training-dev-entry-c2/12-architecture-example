/*
 * Public API Surface of dishes
*/



export { State } from './domain/state';
export { DishState } from './domain/state/dish.state';
export type { IDish } from './domain/model/dish.model';
export type { IDishRequest} from './domain/model/dish.model';
export *  from './infrastructure/ui/routes/guards/dishes.routes';
export {RemoveDishUsecase} from './application/remove-dish.usecase';