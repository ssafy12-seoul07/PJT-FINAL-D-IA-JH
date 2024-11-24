import { computed } from 'vue'

const usePercentageCalculator = (current: number, total: number) => {
  return computed(() => {
    if (!total || total === 0) return 0
    return Math.round((current / total) * 100)
  })
}

export default usePercentageCalculator
