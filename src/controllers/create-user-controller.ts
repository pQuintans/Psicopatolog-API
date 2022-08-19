import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CreateUserService } from '@services/create-user-service'
import { Request, Response } from 'express'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, name, password } = req.body

    const prismaUserRepository = new PrismaUsersRepository()
    const createUserService = new CreateUserService(prismaUserRepository)

    await createUserService.execute({ email, name, password })

    return res.status(201).send()
  }
}
