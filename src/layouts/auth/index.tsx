import { Footer } from '@components/footer'
import { KeyboardAvoiding } from '@components/keyboard-avoiding'
import { LogoSvg } from '@components/logo-svg'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <KeyboardAvoiding.Root className="bg-sky-100">
        <KeyboardAvoiding.View>
          <KeyboardAvoiding.Scroll>
            <View className="mx-auto -mt-6 flex w-52">
              <LogoSvg height={130} style={{ marginTop: 'auto', marginBottom: 'auto' }} />
            </View>
            {children}
            <Footer variant="auth" />
          </KeyboardAvoiding.Scroll>
        </KeyboardAvoiding.View>
      </KeyboardAvoiding.Root>
    </>
  )
}
