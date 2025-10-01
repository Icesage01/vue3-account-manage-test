import type { Account } from '@/entities/account/types'
import { AccountType } from '@/entities/account/types'

interface ValidationErrorMap {
  tagList: boolean
  login: boolean
  password: boolean
}

interface ValidationResult {
  errorMap: ValidationErrorMap
  isValid: boolean
}

export const validateAccount = (
  account: Account,
  tagInputValue: string,
): ValidationResult => {
  const errorMap: ValidationErrorMap = {
    tagList: false,
    login: false,
    password: false,
  }

  if (tagInputValue.length > 50) {
    errorMap.tagList = true
  }

  if (!account.login || account.login.trim().length === 0) {
    errorMap.login = true
  }

  const shouldShowPassword = account.accountType === AccountType.LOCAL
  if (shouldShowPassword) {
    if (account.password === null || account.password.trim().length === 0) {
      errorMap.password = true
    }
  }

  const isValid = !Object.values(errorMap).some((hasError) => hasError)

  return {
    errorMap,
    isValid,
  }
}
