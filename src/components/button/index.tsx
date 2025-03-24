import { cn } from '@utils/cn'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  value?: string
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
} & TouchableOpacityProps

export function Button({
  children,
  disabled,
  className,
  value = '',
  variant = 'primary',
  isLoading = false,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'h-14 items-center justify-center px-4 shadow shadow-sky-800/70',
        {
          'bg-sky-800': variant === 'primary' && !disabled,
          'bg-sky-800/20': variant === 'primary' && disabled,
          'bg-sky-100': variant === 'secondary' && !disabled,
          'bg-sky-100/70': variant === 'secondary' && disabled,
          'shadow-none': disabled,
        },
        className,
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      {isLoading && (
        <ActivityIndicator
          className={cn('mx-auto', {
            'text-white': variant === 'primary',
            'text-sky-900': variant === 'secondary',
            'text-sky-900/25': variant === 'secondary' && disabled,
          })}
          size={20}
        />
      )}
      {!isLoading && children}
      {!isLoading && !children && (
        <Text
          className={cn('mx-auto font-sans-bold text-xl', {
            'text-white': variant === 'primary',
            'text-sky-900': variant === 'secondary',
            'text-sky-900/25': variant === 'secondary' && disabled,
          })}
        >
          {value}
        </Text>
      )}
    </TouchableOpacity>
  )
}
