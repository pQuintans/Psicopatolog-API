import { verify } from 'jsonwebtoken'

interface ValidateHttpOnlyJwtTokenServiceData {
  token?: string
}

export class ValidateHttpOnlyJwtTokenService {
  async execute(request: ValidateHttpOnlyJwtTokenServiceData) {
    const { token } = request

    if (!token) {
      throw new Error('Usuário não autenticado')
    }

    const user = verify(token, process.env.TOKEN_SECRET_KEY)

    if (typeof user === 'object') {
      const { email, name, FormAnswer } = user

      return { email, name, FormAnswer }
    }
  }
}
