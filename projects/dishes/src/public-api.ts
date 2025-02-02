/*
 * Public API Surface of dishes
 */

export * from './infrastructure/ui/routes/dishes.routes';

export * from './domain/model/dishes.model';

export * from './application/dishes/get-dishes.usescase';

export {GetDishesService} from './infrastructure/services/get-dishes.service';

