import { IMailProvider } from '../providers/IMailProvider';
import logger from '../lib/logger';

export class NotificationService {
  private mailProvider: IMailProvider;

  constructor(mailProvider: IMailProvider) {
    this.mailProvider = mailProvider;
  }

  async orderConfirmed(customer: string, orderId: number, total: number, products: any) {
    let lista = '';
    for (const p of products) {
      lista += `<li>${p.name}</li>`;
    }

    const subject = `Confirmação do Pedido #${orderId}`;
    const text = `Olá, seu pedido #${orderId} no valor de R$ ${total} foi confirmado.`;
    const html = `
      <h1>Pedido Confirmado!</h1>
      <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
      <p>Total: <strong>R$ ${total}</strong></p>
      <ul>
        ${lista}
      </ul>
    `;

    const previewUrl = await this.mailProvider.sendMail(customer, subject, text, html);
    logger.info(`Email enviado: ${previewUrl}`);
    return previewUrl;
  }
}
