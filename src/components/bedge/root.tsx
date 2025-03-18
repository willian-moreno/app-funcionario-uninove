import { cn } from '@utils/cn'
import { View, ViewProps } from 'react-native'

type Props = {} & ViewProps

export function Root({ children, className, ...props }: Props) {
  return (
    <View className={cn('relative', className)} {...props}>
      {children}
    </View>
  )
}
