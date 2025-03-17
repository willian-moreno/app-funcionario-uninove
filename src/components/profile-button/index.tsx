import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  userName: string
  onPress: () => void
}

export function ProfileButton({ userName, onPress }: Props) {
  const firstName = userName.split(' ')[0]
  const userNameInitials = userName
    .split(' ')
    .map((name) => name.charAt(0).toLocaleUpperCase())
    .join('')

  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity
        className="aspect-square h-16 w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800"
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text className="text-xl font-semibold text-white">{userNameInitials}</Text>
      </TouchableOpacity>
      <Text className="font-sans-bold text-2xl text-sky-800">Olá, {firstName}</Text>
    </View>
  )
}
