export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export const parseTagList = (tagInput: string): { text: string }[] => {
  if (!tagInput.trim()) {
    return []
  }
  
  return tagInput
    .split(';')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => ({ text: tag }))
}

export const serializeTagList = (tagList: { text: string }[]): string => {
  return tagList.map((tag) => tag.text).join('; ')
}
