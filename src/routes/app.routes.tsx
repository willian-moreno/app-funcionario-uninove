import { AuthLayout } from '@layouts/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FingerprintSignIn } from '@screens/auth/fingerprint-sign-in'
import { ResetPasswordFirstStage } from '@screens/auth/reset-password/first-stage'
import { ResetPasswordSecondStage } from '@screens/auth/reset-password/second-stage'
import { ResetPasswordThirdStage } from '@screens/auth/reset-password/third-stage'
import { SignIn } from '@screens/auth/sign-in'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="sign_in"
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Screen name="sign_in" layout={AuthLayout} component={SignIn} />
      <Screen name="fingerprint_sign_in" layout={AuthLayout} component={FingerprintSignIn} />
      <Screen
        name="reset_password_first_stage"
        layout={AuthLayout}
        component={ResetPasswordFirstStage}
      />
      <Screen
        name="reset_password_second_stage"
        layout={AuthLayout}
        component={ResetPasswordSecondStage}
      />
      <Screen
        name="reset_password_third_stage"
        layout={AuthLayout}
        component={ResetPasswordThirdStage}
      />
    </Navigator>
  )
}
