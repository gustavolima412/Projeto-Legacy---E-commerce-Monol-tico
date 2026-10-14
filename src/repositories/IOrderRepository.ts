export interface IOrderRepository {
  findProductById(id: number): Promise<any>;
  save(order: any): Promise<any>;
}
