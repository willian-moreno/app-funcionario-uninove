import { View, ViewProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {} & ViewProps

export function Root({ children, className, ...props }: Props) {
  return (
    <View className={cn('relative', className)} {...props}>
      {children}
    </View>
  )
}
