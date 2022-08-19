import { MailAdapter } from '@adapters/mail-adapter'

interface HandleEmailContactServiceData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export class HandleEmailContactService {
  constructor(private mailAdapter: MailAdapter) {}

  async execute(request: HandleEmailContactServiceData) {
    const { name, email, phone, subject, message } = request

    if (!name || !email || !message || !subject) {
      throw new Error('Faltam informações')
    }

    await this.mailAdapter.sendContactMail({
      senderName: name,
      senderEmail: email,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Nome: ${name}</p>`,
        `<p>E-mail: ${email}</p>`,
        `${phone ? `<p>Telefone: ${phone}</p>` : ''}`,
        `<p>Assunto: ${subject}</p>`,
        `<p>Messagem: ${message}</p>`,
        '<div>',
      ].join('\n'),
    })

    return
  }
}
