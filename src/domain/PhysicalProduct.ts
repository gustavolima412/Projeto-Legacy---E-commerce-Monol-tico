import { Product } from './IProduct';

export class PhysicalProduct implements Product {
  id: number;
  name: string;
  type: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.type = 'physical';
    this.price = price;
  }

  calculateFreight(): number {
    return 10; // produto físico paga frete fixo
  }
}
