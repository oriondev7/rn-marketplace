import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from './cell_action_button.styles'
import { CellActionButtonProps } from './cell_action_button.types'

export const CellActionButton: React.FC<CellActionButtonProps> = ({
  title,
}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}
