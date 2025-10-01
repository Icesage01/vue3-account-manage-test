<template>
  <div class="app-input">
    <label
      v-if="label"
      :for="inputId"
      class="app-input__label"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :class="['app-input__field', { 'app-input__field--error': hasError }]"
      @input="handleInput"
      @blur="handleBlur"
    >
    <span
      v-if="helperText"
      class="app-input__helper"
    >{{ helperText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  maxLength?: number
  hasError?: boolean
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  type: 'text',
  maxLength: undefined,
  hasError: false,
  helperText: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = () => {
  emit('blur')
}
</script>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 4.5rem;
}

.app-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: left;
}

.app-input__field {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.app-input__field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.app-input__field--error {
  border-color: #ef4444;
}

.app-input__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.app-input__field::placeholder {
  color: #9ca3af;
}

.app-input__helper {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: left;
}
</style>
