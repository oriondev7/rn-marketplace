import { Text } from 'react-native'
import { COLORS } from '../../theme/theme'
import { TabItemTitleProps } from './tab_Item_title.types'

export const TabItemTitle: React.FC<TabItemTitleProps> = ({
  focused,
  title,
}) => {
  return (
    <Text
      style={{
        color: focused ? COLORS.primary : COLORS.gray,
        fontSize: 10,
      }}
    >
      {title}
    </Text>
  )
}
