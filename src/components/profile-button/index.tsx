import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  fullUserName?: string
} & TouchableOpacityProps

export function ProfileButton({ fullUserName = '', disabled, ...props }: Props) {
  const userNameInitials = fullUserName
    .split(' ')
    .slice(0, 2)
    .map((name) => name.charAt(0).toLocaleUpperCase())
    .join('')

  return (
    <TouchableOpacity
      className="aspect-square h-16 w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800"
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text className="text-xl font-semibold text-white">{userNameInitials}</Text>
    </TouchableOpacity>
  )
}
