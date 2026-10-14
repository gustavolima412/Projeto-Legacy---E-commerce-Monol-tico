import { IPaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { DebitCardPayment } from './DebitCardPayment';
import { PixPayment } from './PixPayment';

// Para adicionar um pagamento novo: criar a classe e colocar uma linha aqui
const methods: any = {
  credit_card: new CreditCardPayment(),
  debit_card: new DebitCardPayment(),
  pix: new PixPayment(),
};

export class PaymentFactory {
  static get(name: string): IPaymentMethod {
    const method = methods[name];
    if (!method) {
      throw new Error('Método de pagamento não suportado');
    }
    return method;
  }
}
