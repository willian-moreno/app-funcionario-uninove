import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Ionicons } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import {
  authenticateAsync,
  AuthenticationType,
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'

export function FingerprintSignIn() {
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false)

  const navigation = useNavigation()

  async function verifyAvailableAuthentication() {
    const isScannerAvailable = await hasHardwareAsync()
    const supportedTypes = await supportedAuthenticationTypesAsync()
    const isFingerprintSupported = supportedTypes.includes(AuthenticationType.FINGERPRINT)

    if (!isScannerAvailable || !isFingerprintSupported) {
      return
    }

    setIsFingerprintAvailable(true)
  }

  async function handleSignIn() {
    const isBiometricEnrolled = await isEnrolledAsync()

    if (!isBiometricEnrolled) {
      Alert.alert('Autenticação', 'Nenhuma biometria cadastrada no dispositivo.')

      return
    }

    const status = await authenticateAsync({
      promptMessage: 'Entrar com biometria',
      fallbackLabel: 'Biometria não reconhecida',
      cancelLabel: 'Cancelar',
    })

    if (!status.success) {
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

  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])

  return (
    <View className="flex-1 gap-5">
      <View className="flex-1 items-center justify-center gap-5">
        <Ionicons
          name="finger-print-outline"
          className="pointer-events-none text-8xl leading-none text-sky-400"
        />
        <Text className="font-sans-bold text-center text-3xl text-sky-900">
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
