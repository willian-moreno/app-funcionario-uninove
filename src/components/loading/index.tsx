import { cn } from '@utils/cn'
import { ActivityIndicator, View, ViewProps } from 'react-native'

type Props = {
  variant?: 'default' | 'light'
} & ViewProps

export function Loading({ className, variant = 'default', ...props }: Props) {
  return (
    <View className={cn('flex-1 items-center justify-center', className)} {...props}>
      <ActivityIndicator
        className={cn('text-sky-900', {
          'text-white': variant === 'light',
        })}
        size={32}
      />
    </View>
  )
}
