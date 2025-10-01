import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '../types'

export const useAccountStore = defineStore(
  'account',
  () => {
    const accountList = ref<Account[]>([])

    const addAccount = (account: Account) => {
      accountList.value.push(account)
    }

    const updateAccount = (id: string, updatedAccount: Partial<Account>) => {
      const index = accountList.value.findIndex((acc) => acc.id === id)
      if (index !== -1) {
        accountList.value[index] = { ...accountList.value[index], ...updatedAccount }
      }
    }

    const deleteAccount = (id: string) => {
      accountList.value = accountList.value.filter((acc) => acc.id !== id)
    }

    return {
      accountList,
      addAccount,
      updateAccount,
      deleteAccount,
    }
  },
  {
    persist: {
      storage: localStorage,
      serializer: {
        deserialize: (value: string) => {
          try {
            return JSON.parse(value)
          } catch (error) {
            console.error('Ошибка при загрузке данных из localStorage:', error)
            return { accountList: [] }
          }
        },
        serialize: (value: unknown) => {
          try {
            return JSON.stringify(value)
          } catch (error) {
            console.error('Ошибка при сохранении данных в localStorage:', error)
            return '{}'
          }
        },
      },
    },
  },
)
