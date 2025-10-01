<template>
  <div class="account-list">
    <div
      v-if="accountList.length === 0"
      class="account-list__empty"
    >
      <p>
        Список учетных записей пуст
      </p>
      <p class="account-list__empty-hint">
        Нажмите кнопку "+" чтобы добавить новую запись
      </p>
    </div>

    <TransitionGroup
      v-else
      name="list"
      tag="div"
    >
      <AccountForm
        v-for="account in accountList"
        :key="account.id"
        :account="account"
        @update="handleAccountUpdate"
        @delete="handleAccountDelete"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { AccountForm } from '@/features/account-form'
import type { Account } from '@/entities/account/types'

interface Props {
  accountList: Account[]
}

defineProps<Props>()

const emit = defineEmits<{
  update: [account: Account]
  delete: [id: string]
}>()

const handleAccountUpdate = (account: Account) => {
  emit('update', account)
}

const handleAccountDelete = (id: string) => {
  emit('delete', id)
}
</script>

<style scoped>
.account-list {
  width: 100%;
}

.account-list__empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.account-list__empty p:first-child {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.account-list__empty-hint {
  font-size: 0.875rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
