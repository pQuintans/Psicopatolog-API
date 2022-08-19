import { UsersRepositories } from '@repositories/users-repository'
import { hash } from 'bcryptjs'

interface CreateUserServiceData {
  email: string
  name: string
  password: string
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepositories) {}

  async execute(request: CreateUserServiceData) {
    const { email, name, password } = request

    if (!email || !name || !password) {
      throw new Error('Faltam informações para criar o usuário')
    }

    const emailAlreadyInUse = await this.usersRepository.findUniqueByEmail({
      email,
    })

    if (emailAlreadyInUse) {
      throw new Error('Um usuário com este E-mail já foi cadastrado')
    }

    const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
    const passwordHasLettersAndNumbers = regex.test(password)

    if (!passwordHasLettersAndNumbers) {
      throw new Error(
        'Sua senha deve conter numeros, letras minusculas e letras maiusculas'
      )
    }

    const hashPassword = await hash(password, 8)

    await this.usersRepository.create({
      email,
      name,
      password: hashPassword,
    })

    return
  }
}
