/*
 * Public API Surface of client
 */

export * from './infrastructure/ui/routes/guards/clients.routes';
export type {IClient} from './domain/model/client.model';
export {GetUsersListUsecase} from './application/clients/list-client.usercase';