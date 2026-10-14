import { Product } from './IProduct';

export class DigitalProduct implements Product {
  id: number;
  name: string;
  type: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.type = 'digital';
    this.price = price;
  }

  calculateFreight(): number {
    return 0; // produto digital não tem frete
  }
}
