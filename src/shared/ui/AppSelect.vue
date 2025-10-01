<template>
  <div class="app-select">
    <label
      v-if="label"
      :for="selectId"
      class="app-select__label"
    >
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :class="['app-select__field', { 'app-select__field--error': hasError }]"
      @change="handleChange"
    >
      <option
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  value: string
  label: string
}

interface Props {
  modelValue: string
  label?: string
  optionList: SelectOption[]
  hasError?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  hasError: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const selectId = computed(() => `select-${Math.random().toString(36).substring(2, 9)}`)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}
</script>

<style scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 4.5rem;
}

.app-select__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: left;
}

.app-select__field {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.app-select__field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.app-select__field--error {
  border-color: #ef4444;
}

.app-select__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
</style>
