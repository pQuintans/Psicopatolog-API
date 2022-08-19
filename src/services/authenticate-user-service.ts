import { UsersRepositories } from '@repositories/users-repository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthenticateUserServiceData {
  email: string
  password: string
}

export class AuthenticateUserService {
  constructor(private userRepository: UsersRepositories) {}

  async execute(request: AuthenticateUserServiceData) {
    const { email, password } = request

    if (!email || !password) {
      throw new Error('Faltam informações para autenticar o usuário')
    }

    const userRequisition = await this.userRepository.findUniqueByEmail({
      email,
    })

    if (!userRequisition) {
      throw new Error('E-mail ou Senha Incorretos')
    }

    const passwordsMatch = await compare(password, userRequisition.password)

    if (!passwordsMatch) {
      throw new Error('E-mail ou Senha Incorretos')
    }

    const user = {
      email: userRequisition.email,
      name: userRequisition.name,
      FormAnswer: userRequisition.FormAnswer,
    }

    const token = sign(user, process.env.TOKEN_SECRET_KEY, {
      subject: userRequisition.email,
      expiresIn: '1d',
    })

    return { token, user }
  }
}
