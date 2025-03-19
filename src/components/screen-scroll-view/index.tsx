import { ScrollView, ScrollViewProps } from 'react-native'

type Props = {} & ScrollViewProps

export function ScreenScrollView({ children, contentContainerStyle, ...props }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ flexGrow: 1, padding: 24 }, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  )
}
