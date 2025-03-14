import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-50/70">
      <ActivityIndicator className="text-sky-800" size={32} />
    </View>
  )
}
