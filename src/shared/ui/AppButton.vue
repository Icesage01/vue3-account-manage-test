<template>
  <button
    :type="type"
    :class="['app-button', `app-button--${variant}`, { 'app-button--icon-only': iconOnly }]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'danger' | 'secondary'
  iconOnly?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  iconOnly: false,
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.app-button--primary {
  color: #ffffff;
  background-color: #3b82f6;
}

.app-button--primary:hover {
  background-color: #2563eb;
}

.app-button--primary:active {
  background-color: #1d4ed8;
}

.app-button--danger {
  color: #ffffff;
  background-color: #ef4444;
}

.app-button--danger:hover {
  background-color: #dc2626;
}

.app-button--danger:active {
  background-color: #b91c1c;
}

.app-button--secondary {
  color: #374151;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
}

.app-button--secondary:hover {
  background-color: #e5e7eb;
}

.app-button--secondary:active {
  background-color: #d1d5db;
}

.app-button--icon-only {
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
}
</style>
