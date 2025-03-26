import { cn } from '@utils/cn'
import { ScrollView, ScrollViewProps } from 'react-native'

type Props = {} & ScrollViewProps

export function Scroll({ children, className, contentContainerClassName, ...props }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName={cn('flex-grow p-6', contentContainerClassName)}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  )
}
