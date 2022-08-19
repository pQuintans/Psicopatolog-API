import { ValidateHttpOnlyJwtTokenService } from '@services/validate-httpOnly-jwt-token-service'
import { Request, Response } from 'express'

export class ValidateHttpOnlyJwtTokenController {
  async handle(req: Request, res: Response) {
    const { token } = req.cookies

    const validateHttpOnlyJwtTokenService =
      new ValidateHttpOnlyJwtTokenService()

    const user = await validateHttpOnlyJwtTokenService.execute({
      token,
    })

    return res.status(202).json(user)
  }
}
