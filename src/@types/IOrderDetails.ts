import { IOrder } from "./Order";

export interface OrderDetails extends IOrder{
    patrimonyUser: string,
    description: string,
    solution?: string,
    closed?: string,
}