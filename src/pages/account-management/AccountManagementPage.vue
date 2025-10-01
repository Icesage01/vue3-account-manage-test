<template>
  <div class="account-management-page">
    <div class="container">
      <div class="account-management-page__header">
        <h1 class="account-management-page__title">
          Управление учетными записями
        </h1>
        <AppButton @click="handleAddAccount">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
          </svg>
          Добавить запись
        </AppButton>
      </div>

      <AccountList
        :account-list="accountStore.accountList"
        @update="handleAccountUpdate"
        @delete="handleAccountDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppButton } from '@/shared/ui'
import { AccountList } from '@/widgets/account-list'
import { useAccountStore } from '@/entities/account/model/accountStore'
import type { Account } from '@/entities/account/types'
import { AccountType } from '@/entities/account/types'
import { generateId } from '@/shared/lib/utils'

const accountStore = useAccountStore()

const createEmptyAccount = (): Account => {
  return {
    id: generateId(),
    tagList: [],
    accountType: AccountType.LOCAL,
    login: '',
    password: null,
  }
}

const handleAddAccount = () => {
  const newAccount = createEmptyAccount()
  accountStore.addAccount(newAccount)
}

const handleAccountUpdate = (account: Account) => {
  accountStore.updateAccount(account.id, account)
}

const handleAccountDelete = (id: string) => {
  accountStore.deleteAccount(id)
}
</script>

<style scoped>
.account-management-page {
  padding: 2rem;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.account-management-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.account-management-page__title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

@media (max-width: 768px) {
  .account-management-page {
    padding: 1rem;
  }

  .account-management-page__header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .account-management-page__title {
    font-size: 1.5rem;
  }
}
</style>