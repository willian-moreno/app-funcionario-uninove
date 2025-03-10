import { StatusBar, View, ViewProps } from 'react-native'

type Props = {} & ViewProps

export function AuthLayout({ children }: Props) {
  return (
    <View className="flex-1 bg-sky-100 p-6">
      <StatusBar barStyle="dark-content" className="bg-sky-100" />
      {children}
    </View>
  )
}
