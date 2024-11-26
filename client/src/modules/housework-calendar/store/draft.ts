// stores/formDraft.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HouseworkFormStateProps } from '../interface/HouseworkCalendarInterface'

export const useFormDraftStore = defineStore('draft', () => {
  const draft = ref<HouseworkFormStateProps | null>(null)

  const saveDraft = (formData: HouseworkFormStateProps) => {
    draft.value = formData
  }

  const loadDraft = (): HouseworkFormStateProps | null => {
    return draft.value
  }

  const clearDraft = () => {
    draft.value = null
  }

  return {
    draft,
    saveDraft,
    loadDraft,
    clearDraft,
  }
})
