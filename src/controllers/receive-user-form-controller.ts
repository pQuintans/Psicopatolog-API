import { NodemailerMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ReceiveUserFormService } from '@services/receive-user-form-service'
import { Request, Response } from 'express'

export class ReceiveUserFormController {
  async handle(req: Request, res: Response) {
    const { user_email, qtd_positive_answers, AI_answer } = req.body

    const prismaUserRepository = new PrismaUsersRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const receiveUserFormService = new ReceiveUserFormService(
      prismaUserRepository,
      nodemailerMailAdapter
    )

    const { user, token } = await receiveUserFormService.execute({
      user_email,
      qtd_positive_answers,
      AI_answer,
    })

    return res
      .status(202)
      .cookie('token', token, {
        sameSite: 'none',
        secure: req.headers.host == 'localhost:3000' ? false : true,
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json(user)
  }
}
