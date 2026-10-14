import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { NotificationService } from '../services/NotificationService';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { EtherealMailProvider } from '../providers/EtherealMailProvider';
import logger from '../lib/logger';

// Aqui as peças são montadas (único lugar que escolhe as classes concretas)
const orderRepository = new PrismaOrderRepository();
const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);
const orderService = new OrderService(orderRepository, notificationService);

export class OrderController {
  async processOrder(req: Request, res: Response) {
    try {
      const result = await orderService.createOrder(req.body);

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });
    } catch (error: any) {
      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}
