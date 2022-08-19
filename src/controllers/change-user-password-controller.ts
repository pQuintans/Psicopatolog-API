import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ChangeUserPasswordService } from '@services/change-user-password-service'
import { Request, Response } from 'express'

export class ChangeUserPasswordController {
  async handle(req: Request, res: Response) {
    const { email, newPassword, oldPassword } = req.body

    const prismaUserRepository = new PrismaUsersRepository()
    const changeUserPasswordService = new ChangeUserPasswordService(
      prismaUserRepository
    )

    await changeUserPasswordService.execute({
      email,
      newPassword,
      oldPassword,
    })

    return res.status(200).send()
  }
}
