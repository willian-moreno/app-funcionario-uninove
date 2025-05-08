import { ScrollView, ScrollViewProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {} & ScrollViewProps

export function Scroll({ children, contentContainerClassName, ...props }: Props) {
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
