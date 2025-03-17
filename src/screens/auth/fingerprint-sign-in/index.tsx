import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Ionicons } from '@expo/vector-icons'
import { useBiometrics } from '@hooks/use-biometrics'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Alert, Text, View } from 'react-native'

export function FingerprintSignIn() {
  const { isFingerprintAvailable, isBiometricEnrolled, authenticate } = useBiometrics()

  const navigation = useNavigation()

  async function handleSignIn() {
    if (!isBiometricEnrolled) {
      Alert.alert('Autenticação', 'Nenhuma biometria cadastrada no dispositivo.')

      return
    }

    const success = await authenticate()

    if (!success) {
      return
    }

    Alert.alert('Status', 'Autenticado!')
  }

  async function handleSignOut() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da conta? Ao sair você retornará para a tela de login.',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            navigation.navigate('sign_in')
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: 'sign_in' }],
              }),
            )
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
    <View className="flex-1 gap-5">
      <View className="flex-1 items-center justify-center gap-5">
        <Ionicons
          name="finger-print-outline"
          className="pointer-events-none text-8xl leading-none text-sky-400"
        />
        <Text className="text-center font-sans-bold text-3xl text-sky-900">
          Use a biometria para desbloquear o app
        </Text>
      </View>
      <View className="gap-5">
        <Button value="Usar biometria" disabled={!isFingerprintAvailable} onPress={handleSignIn} />
        <AnchorButton value="Sair da conta" className="mx-auto" onPress={handleSignOut} />
      </View>
    </View>
  )
}
