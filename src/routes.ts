import express from 'express'

import { CreateUserController } from '@controllers/create-user-controller'
import { AuthenticateUserController } from '@controllers/authenticate-user-controller'
import { ValidateHttpOnlyJwtTokenController } from '@controllers/validate-httpOnly-jwt-token-controller'
import { ReceiveUserFormController } from '@controllers/receive-user-form-controller'
import { RunAiScriptController } from '@controllers/run-ai-script-controller'
import { HandleEmailContactController } from '@controllers/handle-email-contact-controller'
import { ChangeUserPasswordController } from '@controllers/change-user-password-controller'

export const router = express.Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const validateHttpOnlyJwtTokenController =
  new ValidateHttpOnlyJwtTokenController()
const receiveUserFormController = new ReceiveUserFormController()
const handleEmailContactController = new HandleEmailContactController()
const changeUserPasswordController = new ChangeUserPasswordController()
const runAiScriptController = new RunAiScriptController()

router.post('/users', createUserController.handle)
router.post('/users/sessions', authenticateUserController.handle)
router.post('/users/send-form', receiveUserFormController.handle)
router.put('/users/change-password', changeUserPasswordController.handle)
router.get('/users/validate', validateHttpOnlyJwtTokenController.handle)
router.get('/logout/students', (req, res) => {
  res.status(202).clearCookie('token').send()
})

router.post('/contact', handleEmailContactController.handle)

router.get('/ai/run-script', runAiScriptController.handle)
