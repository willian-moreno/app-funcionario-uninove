import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Label } from '@components/label'
import { PasswordInput } from '@components/password-input'
import { TextInput } from '@components/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput as NativeTextInput, Text, View } from 'react-native'
import { z } from 'zod'

const signInForm = z.object({
  registration: z.string().regex(/^\d{6}$/, 'Matrícula possui formato inválido.'),
  password: z
    .string()
    .min(8, 'Senha precisa conter no mínimo 8 caracteres')
    .max(100, 'Senha precisa conter no máximo 100 caracteres'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setValue,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    values: {
      registration: '',
      password: '',
    },
  })

  const isSubmitDisabled = !isValid || isSubmitting

  const passwordRef = useRef<NativeTextInput>(null)

  const navigation = useNavigation()

  async function handleSignIn() {
    if (!isValid) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  function handleNavigateToResetPasswordFirstStageScreen() {
    navigation.navigate('reset_password_first_stage')
  }

  function sanitizeRegistration(value: string) {
    setValue('registration', value.replace(/\D+/, ''), { shouldValidate: true })
  }

  async function onRegistrationSubmitEditing() {
    await new Promise((resolve) => setTimeout(resolve, 50))

    if (!passwordRef.current) {
      return
    }

    const valueLength = String(passwordRef.current).length

    passwordRef.current.focus()
    passwordRef.current.setSelection(valueLength, valueLength)
  }

  return (
    <View className="flex-1">
      <Text className="font-sans-bold text-4xl text-sky-900">
        Entre na sua conta de funcionário
      </Text>
      <Text className="font-sans-regular my-5 text-xl text-sky-800">
        Insira sua matrícula abaixo para fazer login em sua conta.
      </Text>
      <View className="mt-auto gap-y-5">
        <View className="flex-1">
          <Label value="Matrícula" />
          <Controller
            control={control}
            name="registration"
            rules={{ required: true }}
            render={({ field: { value, onBlur } }) => (
              <TextInput
                value={value}
                placeholder="000000"
                keyboardType="numeric"
                inputMode="numeric"
                textContentType="username"
                maxLength={6}
                returnKeyLabel="Próximo"
                returnKeyType="next"
                readOnly={isSubmitting}
                onSubmitEditing={onRegistrationSubmitEditing}
                onBlur={onBlur}
                onChangeText={sanitizeRegistration}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label value="Senha" />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <PasswordInput
                inputRef={passwordRef}
                value={value}
                placeholder="*****"
                inputMode="text"
                textContentType="password"
                maxLength={100}
                returnKeyLabel="Entrar"
                returnKeyType="send"
                readOnly={isSubmitting}
                onSubmitEditing={handleSubmit(handleSignIn)}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <Button
          value="Entrar"
          variant="primary"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleSignIn)}
        />
        <AnchorButton
          value="Esqueci minha senha / Primeiro acesso"
          className="mx-auto mt-3"
          disabled={isSubmitting}
          onPress={handleNavigateToResetPasswordFirstStageScreen}
        />
      </View>
    </View>
  )
}
