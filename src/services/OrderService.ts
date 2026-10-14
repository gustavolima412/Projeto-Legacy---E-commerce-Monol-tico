import { IOrderRepository } from '../repositories/IOrderRepository';
import { NotificationService } from './NotificationService';
import { ProductFactory } from '../domain/ProductFactory';
import { PaymentFactory } from '../payments/PaymentFactory';
import logger from '../lib/logger';

export class OrderService {
  private orderRepository: IOrderRepository;
  private notificationService: NotificationService;

  constructor(orderRepository: IOrderRepository, notificationService: NotificationService) {
    this.orderRepository = orderRepository;
    this.notificationService = notificationService;
  }

  async createOrder(data: any) {
    const { customer, items, paymentMethod, paymentDetails } = data;

    // 1. VALIDAÇÃO
    if (!items || items.length === 0) {
      logger.error('Tentativa de pedido sem itens');
      throw new Error('Carrinho vazio');
    }

    // 2. CÁLCULO DO TOTAL (preço + frete de cada produto)
    let totalAmount = 0;
    let productsDetails = [];

    for (const item of items) {
      const productData = await this.orderRepository.findProductById(item.productId);

      if (!productData) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      const product = ProductFactory.createProduct(productData);
      totalAmount += product.price * item.quantity;
      totalAmount += product.calculateFreight();

      productsDetails.push({ ...productData, quantity: item.quantity });
    }

    // 3. PAGAMENTO
    const payment = PaymentFactory.get(paymentMethod);
    payment.process(totalAmount, paymentDetails);

    // 4. SALVAR NO BANCO
    const order = await this.orderRepository.save({
      customer: customer,
      items: productsDetails,
      total: totalAmount,
      status: 'confirmed',
    });

    // 5. NOTIFICAÇÃO
    const emailPreview = await this.notificationService.orderConfirmed(
      customer,
      order.id,
      totalAmount,
      productsDetails
    );

    return { orderId: order.id, emailPreview: emailPreview };
  }
}
