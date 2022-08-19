export interface User {
  id: string
  name: string
  email: string
  password: string
  FormAnswer?: {
    id: string
    FK_user_id: string
    qtd_positive_answers: number
    AI_answer: boolean
    date: string
  }[]
}
