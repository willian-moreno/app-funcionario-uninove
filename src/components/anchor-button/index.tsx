import { cn } from '@utils/cn'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  value: string
} & TouchableOpacityProps

export function AnchorButton({ value, disabled, className, ...props }: Props) {
  return (
    <TouchableOpacity className={cn(className)} activeOpacity={disabled ? 1 : 0.7} {...props}>
      <Text
        className={cn('font-sans-medium text-lg tracking-wide text-sky-800 underline', {
          'text-sky-800/25': disabled,
        })}
      >
        {value}
      </Text>
    </TouchableOpacity>
  )
}
