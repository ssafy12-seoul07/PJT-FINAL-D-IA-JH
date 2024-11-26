export interface RegisterBodyInterface {
  name: string
  email: string
  password: string
  familyId: number | null
  goalKcal: number
  profileImageName: string
}

export interface RegisterFormProps extends RegisterBodyInterface {
  noFamily: boolean
}

export interface LoginFormProps {
  email: string
  password: string
}