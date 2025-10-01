<template>
  <div class="app-password-input">
    <label v-if="label" :for="inputId" class="app-password-input__label">
      {{ label }}
    </label>
    <div class="app-password-input__wrapper">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :class="['app-password-input__field', { 'app-password-input__field--error': hasError }]"
        @input="handleInput"
        @blur="handleBlur"
      />
      <button
        type="button"
        class="app-password-input__toggle"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="showPassword"
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
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <svg
          v-else
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
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  maxLength?: number
  hasError?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  maxLength: undefined,
  hasError: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const showPassword = ref(false)

const inputId = computed(() => `password-input-${Math.random().toString(36).substring(2, 9)}`)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = () => {
  emit('blur')
}
</script>

<style scoped>
.app-password-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 4.5rem;
}

.app-password-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: left;
}

.app-password-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.app-password-input__field {
  width: 100%;
  padding: 0.625rem 3rem 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.app-password-input__field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.app-password-input__field--error {
  border-color: #ef4444;
}

.app-password-input__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.app-password-input__field::placeholder {
  color: #9ca3af;
}

.app-password-input__toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #6b7280;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-password-input__toggle:hover {
  color: #374151;
}

.app-password-input__toggle:focus {
  outline: none;
  color: #3b82f6;
}
</style>
