import LogoSvg from '@assets/logo.svg'
import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Footer } from '@components/footer'
import { KeyboardAvoiding } from '@components/keyboard-avoiding'
import { useAuth } from '@hooks/use-auth'
import { useBiometrics } from '@hooks/use-biometrics'
import FingerprintOutlined from '@material-symbols/svg-600/outlined/fingerprint.svg'
import { svgCssInterop } from '@utils/svg-css-interop'
import { Alert, Text, View } from 'react-native'

svgCssInterop([FingerprintOutlined])

type Props = {
  onSuccess: () => Promise<void>
}

export function FingerprintValidation({ onSuccess }: Props) {
  const { signOut } = useAuth()

  const { isFingerprintAvailable, isBiometricEnrolled, authenticate } = useBiometrics()

  async function handleSignIn() {
    if (!isBiometricEnrolled) {
      Alert.alert('Autenticação', 'Nenhuma biometria cadastrada no dispositivo.')

      return
    }

    const success = await authenticate()

    if (!success) {
      return
    }

    await onSuccess()
  }

  async function handleSignOut() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da conta? Ao sair você retornará para a tela de login.',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            signOut()
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    )
  }

  return (
    <KeyboardAvoiding.Root className="absolute inset-0 z-10 h-svh w-svw flex-1 bg-sky-50">
      <KeyboardAvoiding.View>
        <KeyboardAvoiding.Scroll>
          <View className="mx-auto flex w-52">
            <LogoSvg height={150} style={{ marginTop: 'auto', marginBottom: 'auto' }} />
          </View>
          <View className="flex-1 gap-y-6">
            <View className="flex-1 items-center justify-center gap-y-6">
              <FingerprintOutlined className="pointer-events-none h-28 w-28 fill-sky-400 leading-none" />
              <Text className="text-center font-sans-bold text-3xl text-sky-900">
                Use a biometria para desbloquear o app
              </Text>
            </View>
            <View className="gap-y-6">
              <Button
                value="Usar biometria"
                disabled={!isFingerprintAvailable}
                onPress={handleSignIn}
              />
              <AnchorButton value="Sair da conta" className="mx-auto" onPress={handleSignOut} />
            </View>
          </View>
          <Footer variant="diluted" />
        </KeyboardAvoiding.Scroll>
      </KeyboardAvoiding.View>
    </KeyboardAvoiding.Root>
  )
}
