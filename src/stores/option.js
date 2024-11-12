import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOptionStore = defineStore('option', () => {
  const option = ref(null)
  return { option }
})
