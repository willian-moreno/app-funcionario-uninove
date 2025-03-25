import { cn } from '@utils/cn'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  userNameInitials?: string
  size?: 'default' | 'large'
} & TouchableOpacityProps

export function ProfileButton({
  userNameInitials = '',
  size = 'default',
  disabled,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'aspect-square w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800 shadow shadow-sky-900/70',
        {
          'w-32': size === 'large',
        },
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text
        className={cn('text-xl font-semibold text-white', {
          'text-5xl leading-tight': size === 'large',
        })}
      >
        {userNameInitials}
      </Text>
    </TouchableOpacity>
  )
}
