import { Text } from "react-native"
import { COLORS } from "../theme/theme"

interface TabItemTitleProps {
  focused: boolean
  title: string
}

export const TabItemTitle: React.FC<TabItemTitleProps> = ({ focused, title }) => {
  return (
    <Text style={{ 
      color: focused ? COLORS.primary : COLORS.gray,
      fontSize: 10
    }}>
      {title}
    </Text>
  )
}
