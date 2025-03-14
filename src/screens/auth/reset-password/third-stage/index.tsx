import { Button } from '@components/button'
import { Label } from '@components/label'
import { PasswordInput } from '@components/password-input'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { cn } from '@utils/cn'
import { RefObject, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { z } from 'zod'

const resetPasswordForm = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Senha precisa conter no mínimo 8 caracteres')
      .max(100, 'Senha precisa conter no máximo 100 caracteres'),
    confirmNewPassword: z
      .string()
      .min(8, 'Senha precisa conter no mínimo 8 caracteres')
      .max(100, 'Senha precisa conter no máximo 100 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.confirmNewPassword !== data.newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Senhas diferentes.',
        path: ['confirmNewPassword'],
      })
    }

    return true
  })

type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export function ResetPasswordThirdStage() {
  const {
    control,
    formState: { isValid, isSubmitting },
    watch,
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
    values: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const isSubmitDisabled = !isValid || isSubmitting

  const newPassword = watch('newPassword')

  const rules = [
    {
      text: 'Mínimo uma letra maiúscula',
      isValid: /[A-Z]/.test(newPassword),
    },
    {
      text: 'Mínimo uma letra minúscula',
      isValid: /[a-z]/.test(newPassword),
    },
    {
      text: 'Mínimo um número',
      isValid: /[0-9]/.test(newPassword),
    },
    {
      text: 'Possuir um dos caracteres: @#$%&!',
      isValid: /[^a-zA-Z0-9]/.test(newPassword),
    },
    {
      text: 'Mínimo de 8 dígitos',
      isValid: /^.{8,100}$/.test(newPassword),
    },
  ]

  const confirmNewPasswordRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  async function handleResetPasswordThirdStage() {
    if (!isValid) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    navigation.navigate('sign_in')
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'sign_in' }],
      }),
    )
  }

  async function onTextInputNextSubmit(textInputRef: RefObject<TextInput>) {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const valueLength = String(textInputRef.current ?? '').length

    textInputRef.current?.focus()
    textInputRef.current?.setSelection(valueLength, valueLength)
  }

  return (
    <View className="flex-1">
      <View className="mt-auto gap-y-5">
        <Text className="font-sans-bold text-2xl text-sky-800">Olá, Willian</Text>
        <Text className="font-sans-regular text-xl text-sky-800">
          Sua senha deve possuir os critérios listados a seguir:
        </Text>
        <View className="flex-1 gap-y-2">
          {rules.map((rule) => (
            <View key={rule.text} className="flex w-full flex-1 flex-row items-center gap-2">
              <Ionicons
                name={rule.isValid ? 'checkmark-circle-outline' : 'ellipse-outline'}
                size={24}
                className={cn('pointer-events-none text-sky-800', {
                  'text-sky-400': rule.isValid,
                })}
              />
              <Text
                className={cn('font-sans-semibold text-lg tracking-tight text-sky-800', {
                  'text-sky-400': rule.isValid,
                })}
              >
                {rule.text}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-1">
          <Label value="Nova senha" />
          <Controller
            control={control}
            name="newPassword"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <PasswordInput
                value={value}
                placeholder="*****"
                inputMode="text"
                textContentType="password"
                maxLength={100}
                returnKeyLabel="Próximo"
                returnKeyType="next"
                readOnly={isSubmitting}
                onSubmitEditing={() => onTextInputNextSubmit(confirmNewPasswordRef)}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label value="Confirmar a nova senha" />
          <Controller
            control={control}
            name="confirmNewPassword"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <PasswordInput
                inputRef={confirmNewPasswordRef}
                value={value}
                placeholder="*****"
                inputMode="text"
                textContentType="password"
                maxLength={100}
                returnKeyLabel="Enviar"
                returnKeyType="send"
                readOnly={isSubmitting}
                onSubmitEditing={handleSubmit(handleResetPasswordThirdStage)}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <Button
          value="Cadastrar senha"
          variant="primary"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleResetPasswordThirdStage)}
        />
      </View>
    </View>
  )
}
