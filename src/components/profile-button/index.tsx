import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  userNameInitials?: string
  size?: 'default' | 'large'
} & TouchableOpacityProps

export function ProfileButton({
  className,
  userNameInitials = '',
  size = 'default',
  disabled,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'aspect-square w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800',
        className,
        {
          'w-28': size === 'large',
        },
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text
        className={cn('pointer-events-none font-sans-semibold text-xl text-white', {
          'text-4xl leading-tight': size === 'large',
        })}
      >
        {userNameInitials}
      </Text>
    </TouchableOpacity>
  )
}
