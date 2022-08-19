import nodemailer from 'nodemailer'
import { MailAdapter, SendContactMailData, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'camfixa10@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subjectName, emailSubject, subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Psicopatolog <camfixa10@gmail.com>',
      to: subjectName + '<' + subject + '>',
      subject: emailSubject,
      html: body,
    })
  }

  async sendContactMail({
    senderName,
    senderEmail,
    body,
  }: SendContactMailData) {
    await transport.sendMail({
      from: `${senderName} <${senderEmail}>`,
      to: 'Equipe Psicopatolog <camfixa10@gmail.com>',
      subject: 'Contato via site',
      html: body,
    })
  }
}
