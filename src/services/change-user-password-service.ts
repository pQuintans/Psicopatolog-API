import { UsersRepositories } from '@repositories/users-repository'
import { compare, hash } from 'bcryptjs'

interface ChangeUserPasswordServiceData {
  email: string
  newPassword: string
  oldPassword: string
}

export class ChangeUserPasswordService {
  constructor(private usersRepository: UsersRepositories) {}

  async execute(request: ChangeUserPasswordServiceData) {
    const { email, newPassword, oldPassword } = request

    if (!email || !newPassword || !oldPassword) {
      throw new Error('Faltam informações para criar o usuário')
    }

    const user = await this.usersRepository.findUniqueByEmail({
      email,
    })

    if (!user) {
      throw new Error('Nenhum usuário com este E-Mail encontrado')
    }

    const oldPasswordMatch = await compare(oldPassword, user.password)

    if (!oldPasswordMatch) {
      throw new Error('Senha antiga incorreta')
    }

    const hashPassword = await hash(newPassword, 8)

    await this.usersRepository.updatePassword({
      email,
      password: hashPassword,
    })

    return
  }
}
