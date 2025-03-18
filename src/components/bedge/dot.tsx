import { cn } from '@utils/cn'
import { View, ViewProps } from 'react-native'

type Props = {} & ViewProps

export function Dot({ children, className, ...props }: Props) {
  return (
    <View
      className={cn(
        'pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-full bg-red-500',
        className,
      )}
      {...props}
    />
  )
}
