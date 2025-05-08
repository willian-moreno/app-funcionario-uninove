import { ScrollView, ScrollViewProps, View } from 'react-native'

import { cn } from '@utils/cn'

type Props = {} & ScrollViewProps

export function ScreenScrollView({ children, contentContainerClassName, ...props }: Props) {
  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName={cn('flex-grow p-6', contentContainerClassName)}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  )
}
