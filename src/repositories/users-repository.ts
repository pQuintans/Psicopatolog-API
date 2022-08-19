import { User } from '@models/user-model'

export interface UserCreateData {
  name: string
  email: string
  password: string
}

export interface UserFindUniqueByEmailData {
  email: string
}

export interface UserUpdateFormInformationsData {
  FK_user_id: string
  qtd_positive_answers: number
  AI_answer: boolean
  date: string
}

export interface UserUpdatePasswordData {
  email: string
  password: string
}

export interface UsersRepositories {
  create: (data: UserCreateData) => Promise<void>
  findUniqueByEmail: (data: UserFindUniqueByEmailData) => Promise<User>
  updateFormInformations: (
    data: UserUpdateFormInformationsData
  ) => Promise<void>
  updatePassword: (data: UserUpdatePasswordData) => Promise<void>
}
