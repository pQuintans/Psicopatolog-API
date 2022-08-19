/* eslint-disable indent */
import { MailAdapter } from '@adapters/mail-adapter'
import { UsersRepositories } from '@repositories/users-repository'
import { sign } from 'jsonwebtoken'
import { CronJob } from 'cron'
// import { sign } from 'jsonwebtoken'

interface ReceiveUserFormServiceData {
  user_email: string
  qtd_positive_answers: number
  AI_answer: boolean
}

export class ReceiveUserFormService {
  constructor(
    private usersRepository: UsersRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: ReceiveUserFormServiceData) {
    const { user_email, qtd_positive_answers, AI_answer } = request

    if (!qtd_positive_answers && !user_email && qtd_positive_answers !== 0) {
      throw new Error('Faltam informações')
    }

    const user = await this.usersRepository.findUniqueByEmail({
      email: user_email,
    })

    if (!user) {
      throw new Error('Nenhum usuário com este E-Mail encontrado')
    }

    const date = new Date().toLocaleDateString('pt-BR')

    await this.usersRepository.updateFormInformations({
      FK_user_id: user.id,
      qtd_positive_answers,
      AI_answer,
      date,
    })

    const updatedUser = await this.usersRepository.findUniqueByEmail({
      email: user_email,
    })

    const subjectName = updatedUser.name
    const subject = updatedUser.email

    let response = 0

    updatedUser.FormAnswer.map(answer => {
      if (answer.AI_answer === true) {
        response++
      } else if (answer.qtd_positive_answers > 15) {
        response++
      }
    })

    const emailSubject =
      updatedUser.FormAnswer.length == 3
        ? 'Você respondeu todos os 3 formulários.'
        : 'Você já está apto para responder o próximo formulário.'

    const body = [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
      `<p>Olá ${subjectName},</p>`,
      `<p>${
        updatedUser.FormAnswer.length == 3
          ? 'Você concluiu todos os formulários que eram requeridos, o resultado é o seguinte:'
          : 'Já se passaram 20 dias, o que quer dizer que você já está pronto para responder o próximo formulário! Clique no link abaixo'
      }</p>`,
      '',
      `<p>${
        updatedUser.FormAnswer.length == 3
          ? `A partir dos três testes, foi concluído que ${
              response > 1
                ? 'é importante que você procure um psicólogo.'
                : 'sua saúde mental está bem.'
            }`
          : '<a href="http://localhost:3000/formulario">Formulário</a>'
      }
      </p>`,
      '<div>',
    ].join('\n')

    const mailData = {
      subjectName,
      subject,
      emailSubject,
      body,
    }

    if (updatedUser.FormAnswer.length !== 3) {
      const date = new Date()
      date.setDate(date.getDate() + 15)
      const job = new CronJob(
        date,
        () => {
          this.mailAdapter.sendMail(mailData)
          job.stop()
        },
        null,
        true,
        ''
      )
      job.start()
    } else {
      await this.mailAdapter.sendMail(mailData)
    }

    const token = sign(updatedUser, process.env.TOKEN_SECRET_KEY, {
      subject: updatedUser.email,
      expiresIn: '1d',
    })

    return { user: updatedUser, token }
  }
}
