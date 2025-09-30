export enum AccountType {
  LDAP = 'LDAP',
  LOCAL = 'Локальная',
}

export interface TagItem {
  text: string
}

export interface Account {
  id: string
  tagList: TagItem[]
  accountType: AccountType
  login: string
  password: string | null
}
