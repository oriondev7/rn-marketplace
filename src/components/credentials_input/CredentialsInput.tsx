import React from 'react'
import { TextInput, View } from 'react-native'
import { styles } from './credentials_input.styles'
import { CIType } from '../../constants'
import { COLORS } from '../../theme/theme'
import Person from '../../assets/icons/person.svg'
import Email from '../../assets/icons/email.svg'
import Lock from '../../assets/icons/lock.svg'
import { CredentialsInputProps } from './credentials_input.types'

export const CredentialsInput: React.FC<CredentialsInputProps> = ({
  type,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      {type === CIType.person ? (
        <Person width={25} height={25} fill={COLORS.gray} />
      ) : type === CIType.email ? (
        <Email width={25} height={25} fill={COLORS.gray} />
      ) : (
        <Lock width={25} height={25} fill={COLORS.gray} />
      )}

      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        secureTextEntry={type === CIType.password}
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </View>
  )
}
