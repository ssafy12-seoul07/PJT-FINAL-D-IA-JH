export interface HouseworkInterface {
  id: number
  familyId: number
  registerUserId: number
  assignedUserId: number
  name: string
  description: string
  color: string | null
  calorieAmount: number
  startAt: Date | string
  dueAt: Date | string
  doneAt: Date | string | null
  createdAt: Date | string
  updatedAt: Date | string
}

export type HouseworkFormModeType = 'create' | 'read' | 'edit'
