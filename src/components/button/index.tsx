import { cn } from '@utils/cn'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  value: string
  variant?: 'primary' | 'secondary'
} & TouchableOpacityProps

export function Button({ value, disabled, variant = 'primary', className, ...props }: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'h-14 items-center justify-center rounded-sm',
        {
          'bg-sky-800': variant === 'primary' && !disabled,
          'bg-sky-800/20': variant === 'primary' && disabled,
          'bg-sky-50': variant === 'secondary' && !disabled,
          'bg-sky-50/70': variant === 'secondary' && disabled,
        },
        className,
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text
        className={cn('font-sans text-xl', {
          'text-white': variant === 'primary',
          'text-sky-800': variant === 'secondary',
          'text-sky-800/25': variant === 'secondary' && disabled,
        })}
      >
        {value}
      </Text>
    </TouchableOpacity>
  )
}
