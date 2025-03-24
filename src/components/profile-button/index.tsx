import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  userNameInitials?: string
} & TouchableOpacityProps

export function ProfileButton({ userNameInitials = '', disabled, ...props }: Props) {
  return (
    <TouchableOpacity
      className="aspect-square h-16 w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800 shadow shadow-sky-800/70"
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text className="text-xl font-semibold text-white">{userNameInitials}</Text>
    </TouchableOpacity>
  )
}
