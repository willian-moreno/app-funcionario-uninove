import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-100/70">
      <ActivityIndicator className="text-black" size={32} />
    </View>
  )
}
