import { Ionicons } from '@expo/vector-icons'
import { cn } from '@utils/cn'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  icon: keyof typeof Ionicons.glyphMap
  variant?: 'default' | 'active'
} & TouchableOpacityProps

export function IconButton({ icon, disabled, className, variant = 'default', ...props }: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-100',
        className,
        {
          'bg-sky-800': variant === 'active',
        },
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Ionicons
        name={icon}
        className={cn('text-3xl font-semibold text-sky-900', {
          'text-white': variant === 'active',
        })}
      />
    </TouchableOpacity>
  )
}
