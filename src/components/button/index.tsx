import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  value?: string
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  size?: 'base' | 'sm'
} & TouchableOpacityProps

export function Button({
  children,
  disabled,
  className,
  value = '',
  variant = 'primary',
  isLoading = false,
  size = 'base',
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'h-14 items-center justify-center px-4 shadow shadow-sky-900/70',
        {
          'bg-sky-800': variant === 'primary' && !disabled,
          'bg-sky-800/20': variant === 'primary' && disabled,
          'bg-sky-50': variant === 'secondary' && !disabled,
          'bg-sky-50/70': variant === 'secondary' && disabled,
          'shadow-none': disabled,
          'h-10 px-2': size === 'sm',
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
