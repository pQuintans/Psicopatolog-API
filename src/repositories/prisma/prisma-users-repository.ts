import { prisma } from '../../prisma'

import {
  UserCreateData,
  UserFindUniqueByEmailData,
  UsersRepositories,
  UserUpdateFormInformationsData,
  UserUpdatePasswordData,
} from '@repositories/users-repository'

export class PrismaUsersRepository implements UsersRepositories {
  async create({ email, name, password }: UserCreateData) {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
  }

  async findUniqueByEmail({ email }: UserFindUniqueByEmailData) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        FormAnswer: true,
      },
    })

    return user
  }

  async updateFormInformations({
    FK_user_id,
    date,
    qtd_positive_answers,
    AI_answer,
  }: UserUpdateFormInformationsData) {
    await prisma.formAnswer.create({
      data: { FK_user_id, qtd_positive_answers, AI_answer, date },
    })
  }
  async updatePassword({ email, password }: UserUpdatePasswordData) {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    })
  }
}
