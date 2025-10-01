<template>
  <div class="account-item">
    <div class="account-item__row">
      <div class="account-item__field account-item__field--tags">
        <AppInput
          v-model="tagInputValue"
          label="Метка"
          placeholder="Метка1; Метка2; Метка3"
          :max-length="50"
          :has-error="validationStateMap.tagList"
          @blur="handleTagBlur"
        />
      </div>
      
      <div class="account-item__field">
        <AppSelect
          v-model="localAccount.accountType"
          label="Тип записи"
          :option-list="accountTypeOptionList"
          @change="handleAccountTypeChange"
        />
      </div>

      <div class="account-item__field">
        <AppInput
          v-model="localAccount.login"
          label="Логин"
          placeholder="Введите логин"
          :max-length="100"
          :has-error="validationStateMap.login"
          @blur="handleFieldBlur"
        />
      </div>

      <div class="account-item__field">
        <AppPasswordInput
          v-if="shouldShowPassword"
          v-model="localAccount.password!"
          label="Пароль"
          placeholder="Введите пароль"
          :max-length="100"
          :has-error="validationStateMap.password"
          @blur="handleFieldBlur"
        />
        <div v-else class="account-item__field--hidden">
          <!-- Скрытое поле для сохранения макета -->
        </div>
      </div>

      <div class="account-item__actions">
        <AppButton variant="danger" icon-only @click="handleDelete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { AppInput, AppSelect, AppButton, AppPasswordInput } from '@/shared/ui'
import type { Account } from '@/entities/account/types'
import { AccountType } from '@/entities/account/types'
import { parseTagListFromString, stringifyTagListToString } from '@/shared/lib/utils'
import { validateAccount as validateAccountUtil } from '@/shared/lib/validation'

interface Props {
  account: Account
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [account: Account]
  delete: [id: string]
}>()

const localAccount = ref<Account>({ ...props.account })
const tagInputValue = ref<string>(stringifyTagListToString(props.account.tagList))

const validationStateMap = ref({
  tagList: false,
  login: false,
  password: false,
})

const accountTypeOptionList = [
  { value: AccountType.LDAP, label: 'LDAP' },
  { value: AccountType.LOCAL, label: 'Локальная' },
]

const shouldShowPassword = computed(() => {
  return localAccount.value.accountType === AccountType.LOCAL
})

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount }
    tagInputValue.value = stringifyTagListToString(newAccount.tagList)
  }
)

const validateAccount = (): boolean => {
  const { errorMap, isValid } = validateAccountUtil(localAccount.value, tagInputValue.value)
  validationStateMap.value = errorMap
  return isValid
}

const handleTagBlur = () => {
  localAccount.value.tagList = parseTagListFromString(tagInputValue.value)
  handleFieldBlur()
}

const handleFieldBlur = () => {
  const isValid = validateAccount()
  if (isValid) {
    emit('update', { ...localAccount.value })
  }
}

const handleAccountTypeChange = () => {
  if (localAccount.value.accountType === AccountType.LDAP) {
    localAccount.value.password = null
    validationStateMap.value.password = false
  }
  
  const isValid = validateAccount()
  if (isValid) {
    emit('update', { ...localAccount.value })
  }
}

const handleDelete = () => {
  emit('delete', localAccount.value.id)
}
</script>

<style scoped>
.account-item {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.15s ease-in-out;
}

.account-item:hover {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.account-item__row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr auto;
  gap: 1rem;
  align-items: end;
}

.account-item__field--tags {
  grid-column: span 1;
}

.account-item__field--hidden {
  height: 4.5rem;
  /* Скрытое поле для сохранения макета */
}

.account-item__actions {
  display: flex;
  align-items: center;
  padding-bottom: 0.125rem;
}

@media (max-width: 1024px) {
  .account-item__row {
    grid-template-columns: 1fr;
  }
  
  .account-item__field--tags {
    grid-column: span 1;
  }

  .account-item__actions {
    justify-content: flex-end;
    padding-bottom: 0;
  }
}
</style>
