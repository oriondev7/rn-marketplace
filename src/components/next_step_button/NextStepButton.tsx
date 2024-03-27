import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from './next_step_button.styles'
import { NextStepButtonProps } from './next_step_button.types'

export const NextStepButton: React.FC<NextStepButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}
