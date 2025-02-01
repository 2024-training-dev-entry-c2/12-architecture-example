export interface IUser{
    username: string;
    password: string;

}
export interface IUserCreate{
    username: string;
    password: string;
    email: string;

}
export interface IUserRequest{
    username: string;
    password: string;
    roles: string

}
export interface IUserResponse{
    username: string;
    password: string;
    roles: string

}