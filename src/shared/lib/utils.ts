import type { TagItem } from '@/entities/account/types'

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${Math.random().toString(36).substring(2, 9)}`
}

export const parseTagListFromString = (tagString: string): TagItem[] => {
  if (!tagString.trim()) {
    return []
  }

  return tagString
    .split(';')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => ({ text: tag }))
}

export const stringifyTagListToString = (tagList: TagItem[]): string => {
  return tagList.map((tag) => tag.text).join('; ')
}
