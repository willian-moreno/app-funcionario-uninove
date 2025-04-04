import { AuthLayout } from '@layouts/auth'
import { AuthenticatedArea } from '@layouts/authenticated-area'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ResetPasswordFirstStage } from '@screens/auth/reset-password/first-stage'
import { ResetPasswordSecondStage } from '@screens/auth/reset-password/second-stage'
import { ResetPasswordThirdStage } from '@screens/auth/reset-password/third-stage'
import { SignIn } from '@screens/auth/sign-in'
import { EmployeeOnVacation } from '@screens/authenticated-area/employee-on-vacation'
import { Home } from '@screens/authenticated-area/home'
import { MyProfile } from '@screens/authenticated-area/my-profile'
import { Notifications } from '@screens/authenticated-area/notifications'
import { QRCode } from '@screens/authenticated-area/qr-code'

const { Navigator, Group, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="sign_in"
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom', statusBarStyle: 'dark' }}
    >
      <Group screenLayout={AuthLayout}>
        <Screen name="sign_in" component={SignIn} />
        <Screen name="reset_password_first_stage" component={ResetPasswordFirstStage} />
        <Screen name="reset_password_second_stage" component={ResetPasswordSecondStage} />
        <Screen name="reset_password_third_stage" component={ResetPasswordThirdStage} />
      </Group>
      <Group screenLayout={AuthenticatedArea}>
        <Screen name="employee_on_vacation" component={EmployeeOnVacation} />
        <Screen name="home" component={Home} />
        <Screen name="my_profile" component={MyProfile} />
        <Screen name="notifications" component={Notifications} />
        <Screen name="qr_code" component={QRCode} />
      </Group>
    </Navigator>
  )
}
