export interface userInfoInterface {
  id: number
  familyId: number
  name: string
  email: string
  password: string
  familyRole: string | null
  profileImageName: string | null
  calorieGoal: number
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface familyInfoInterface {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  members: familyListInteface[]
}

export interface familyListInteface {
  id: number
  name: string
  email: string
  familyRole: string | null
  profileImageName: string | null
  calorieGoal: number
}
