import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from './IOrderRepository';

const prisma = new PrismaClient();

export class PrismaOrderRepository implements IOrderRepository {
  async findProductById(id: number) {
    return prisma.product.findUnique({ where: { id: id } });
  }

  async save(order: any) {
    return prisma.order.create({
      data: {
        customer: order.customer,
        items: JSON.stringify(order.items), // no banco os itens ficam como texto
        total: order.total,
        status: order.status,
      },
    });
  }
}
