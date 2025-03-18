import { Button } from '@components/button'
import { Label } from '@components/label'
import { TextInput } from '@components/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { maskCpfNumber } from '@utils/mask-cpf-number'
import { maskDate } from '@utils/mask-date'
import { RefObject, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput as NativeTextInput, Text, View } from 'react-native'
import { z } from 'zod'

const resetPasswordForm = z.object({
  registration: z.string().regex(/^\d{6}$/, 'Matrícula possui formato inválido.'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF possui formato inválido.'),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento possui formato inválido.'),
  dateOfAdmission: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de adimissão possui formato inválido.'),
})

type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export function ResetPasswordFirstStage() {
  const navigation = useNavigation()

  const {
    control,
    formState: { isValid, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
    values: {
      registration: '',
      cpf: '',
      dateOfBirth: '',
      dateOfAdmission: '',
    },
  })

  const cpfRef = useRef<NativeTextInput>(null)
  const dateOfBirthRef = useRef<NativeTextInput>(null)
  const dateOfAdmissionRef = useRef<NativeTextInput>(null)

  const isSubmitDisabled = !isValid || isSubmitting

  async function handleResetPasswordFirstStage() {
    if (!isValid) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    navigation.navigate('reset_password_second_stage')
  }

  function sanitizeRegistration(value: string) {
    const newValue = value.replace(/\D+/, '')
    setValue('registration', newValue, { shouldValidate: true })
  }

  function formatCPF(value: string) {
    const newValue = maskCpfNumber(value)
    setValue('cpf', newValue, { shouldValidate: true })
  }

  function formatDateOfBirth(value: string) {
    const newValue = maskDate(value)
    setValue('dateOfBirth', newValue, { shouldValidate: true })
  }

  function formatDateOfAdmission(value: string) {
    const newValue = maskDate(value)
    setValue('dateOfAdmission', newValue, { shouldValidate: true })
  }

  async function onTextInputNextSubmit(textInputRef: RefObject<NativeTextInput>) {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const valueLength = String(textInputRef.current ?? '').length

    textInputRef.current?.focus()
    textInputRef.current?.setSelection(valueLength, valueLength)
  }

  return (
    <View className="flex-1">
      <Text className="mb-5 font-sans-regular text-xl text-sky-800">
        Para cadastrar uma nova senha, preencha os campos abaixo:
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
                onSubmitEditing={() => onTextInputNextSubmit(cpfRef)}
                onBlur={onBlur}
                onChangeText={sanitizeRegistration}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label value="CPF" />
          <Controller
            control={control}
            name="cpf"
            rules={{ required: true }}
            render={({ field: { value, onBlur } }) => (
              <TextInput
                inputRef={cpfRef}
                value={value}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                inputMode="numeric"
                textContentType="none"
                maxLength={14}
                returnKeyLabel="Próximo"
                returnKeyType="next"
                readOnly={isSubmitting}
                onSubmitEditing={() => onTextInputNextSubmit(dateOfBirthRef)}
                onBlur={onBlur}
                onChangeText={formatCPF}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label value="Data de nascimento" />
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: true }}
            render={({ field: { value, onBlur } }) => (
              <TextInput
                inputRef={dateOfBirthRef}
                value={value}
                placeholder="00/00/0000"
                keyboardType="numeric"
                inputMode="numeric"
                textContentType="birthdate"
                maxLength={10}
                returnKeyLabel="Próximo"
                returnKeyType="next"
                readOnly={isSubmitting}
                onSubmitEditing={() => onTextInputNextSubmit(dateOfAdmissionRef)}
                onBlur={onBlur}
                onChangeText={formatDateOfBirth}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label value="Data de admissão" />
          <Controller
            control={control}
            name="dateOfAdmission"
            rules={{ required: true }}
            render={({ field: { value, onBlur } }) => (
              <TextInput
                inputRef={dateOfAdmissionRef}
                value={value}
                placeholder="00/00/0000"
                keyboardType="numeric"
                inputMode="numeric"
                textContentType="none"
                maxLength={10}
                returnKeyLabel="Enviar"
                returnKeyType="send"
                readOnly={isSubmitting}
                onSubmitEditing={handleSubmit(handleResetPasswordFirstStage)}
                onBlur={onBlur}
                onChangeText={formatDateOfAdmission}
              />
            )}
          />
        </View>
        <Button
          value="Entrar"
          variant="primary"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleResetPasswordFirstStage)}
        />
      </View>
    </View>
  )
}
