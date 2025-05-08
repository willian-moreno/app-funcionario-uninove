import { useEffect, useState } from 'react'

import {
  authenticateAsync,
  AuthenticationType,
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'

export function useBiometrics() {
  const [isBiometricVerificationLoading, setIsBiometricVerificationLoading] = useState(true)
  const [isScannerAvailable, setIsScannerAvailable] = useState(false)
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false)
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false)

  async function verifyAvailableAuthentication() {
    setIsBiometricVerificationLoading(true)

    const isScannerAvailable = await hasHardwareAsync()
    setIsScannerAvailable(isScannerAvailable)

    const supportedTypes = await supportedAuthenticationTypesAsync()
    const isFingerprintSupported = supportedTypes.includes(AuthenticationType.FINGERPRINT)
    setIsFingerprintAvailable(isScannerAvailable && isFingerprintSupported)

    const isBiometricEnrolled = await isEnrolledAsync()
    setIsBiometricEnrolled(isScannerAvailable && isFingerprintSupported && isBiometricEnrolled)

    setIsBiometricVerificationLoading(false)
  }

  async function authenticate() {
    if (!isScannerAvailable || !isFingerprintAvailable || !isBiometricEnrolled) {
      return
    }

    const status = await authenticateAsync({
      promptMessage: 'Use seu método de desbloqueio',
      fallbackLabel: 'Biometria não reconhecida',
      cancelLabel: 'Cancelar',
    })

    return status.success
  }

  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])

  return {
    isScannerAvailable,
    isFingerprintAvailable,
    isBiometricEnrolled,
    isBiometricVerificationLoading,
    authenticate,
  }
}
