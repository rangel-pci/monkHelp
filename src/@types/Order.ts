export interface IOrder{
    id: string,
    priority: 0 | 1 | 2,
    patrimony: string,
    when: string,
    status: 'open' | 'closed',
}