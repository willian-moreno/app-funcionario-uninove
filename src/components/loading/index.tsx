import { cn } from '@utils/cn'
import { ActivityIndicator, View, ViewProps } from 'react-native'

type Props = {} & ViewProps

export function Loading({ className, ...props }: Props) {
  return (
    <View className={cn('flex-1 items-center justify-center', className)} {...props}>
      <ActivityIndicator className="text-sky-900" size={32} />
    </View>
  )
}
