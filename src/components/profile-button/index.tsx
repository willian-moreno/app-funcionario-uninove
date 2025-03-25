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
          'w-28': size === 'large',
        },
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text
        className={cn('font-sans-semibold text-xl text-white', {
          'text-4xl leading-tight': size === 'large',
        })}
      >
        {userNameInitials}
      </Text>
    </TouchableOpacity>
  )
}
