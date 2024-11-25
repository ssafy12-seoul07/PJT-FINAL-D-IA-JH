export interface MyHouseworkInterface {
  id: number
  familyId: number
  registerUserId: number
  assignedUserId: number
  name: string
  description: string
  color: string | null
  calorieAmount: number
  startAt: Date
  dueAt: Date
  doneAt: Date | null
  createdAt: Date
  updatedAt: Date
}
