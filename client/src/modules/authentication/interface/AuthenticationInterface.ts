export interface RegisterFormProps {
  name: string
  email: string
  password: string
  familyId: number | null
  goalKcal: number
  profileImageName: string
  noFamily: boolean
}

export interface LoginFormProps {
  email: string
  password: string
}
