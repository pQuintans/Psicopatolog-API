import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { AuthenticateUserService } from '@services/authenticate-user-service'
import { Request, Response } from 'express'

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const prismaUserRepository = new PrismaUsersRepository()
    const authenticateUserService = new AuthenticateUserService(
      prismaUserRepository
    )

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
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
