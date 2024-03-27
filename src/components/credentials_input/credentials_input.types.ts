import { CIType } from '../../constants'

export interface CredentialsInputProps {
  type: CIType
  value: string
  onChangeText: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}
