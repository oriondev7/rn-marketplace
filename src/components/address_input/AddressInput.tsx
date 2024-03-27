import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './add_new_address.styles'
import { AddressInputProps } from './address_input.types'

export const AddressInput: React.FC<AddressInputProps> = ({
  title,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{title}</Text>

      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  )
}
