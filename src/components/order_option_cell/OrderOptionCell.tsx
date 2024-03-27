import React, { PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { styles } from './order_option_cell.styles'
import { COLORS } from '../../theme/theme'
import { NextStepButton } from '../'
import { OrderOptionCellProps } from './order_option_cell.types'

export const OrderOptionCell: React.FC<
  PropsWithChildren<OrderOptionCellProps>
> = ({
  selected,
  mainButtonTitle,
  onCellPress,
  onMainButtonPress,
  children,
}) => {
  return (
    <Pressable onPress={onCellPress} style={styles.container}>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.circleContainer,
            {
              borderColor: selected ? COLORS.primary : COLORS.gray,
            },
          ]}
        >
          {selected && <View style={styles.circle} />}
        </View>

        <View style={styles.children}>{children}</View>
      </View>
      {selected && (
        <View style={styles.infoContainer}>
          <View style={styles.circleWidth} />
          <NextStepButton title={mainButtonTitle} onPress={onMainButtonPress} />
        </View>
      )}
    </Pressable>
  )
}
