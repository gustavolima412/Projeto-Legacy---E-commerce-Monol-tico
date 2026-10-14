import nodemailer from 'nodemailer';
import { IMailProvider } from './IMailProvider';
import { getMailClient } from '../lib/mail';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    // link para visualizar o email no Ethereal
    return nodemailer.getTestMessageUrl(info);
  }
}
