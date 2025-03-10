import { AuthLayout } from '@layouts/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/auth/sign-in'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="sign_in"
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Screen name="sign_in" layout={AuthLayout} component={SignIn} />
    </Navigator>
  )
}
