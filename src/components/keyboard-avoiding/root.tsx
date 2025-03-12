import { cn } from '@utils/cn'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

type Props = {} & SafeAreaViewProps

export function Root({ children, className, ...props }: Props) {
  return (
    <SafeAreaView className={cn('flex-1', className)} {...props}>
      {children}
    </SafeAreaView>
  )
}
