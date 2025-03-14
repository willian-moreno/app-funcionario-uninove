import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Label } from '@components/label'
import { OTPInput } from '@components/otp-input'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

const resetPasswordForm = z.object({
  pin: z.string().regex(/^\d{4}$/, 'PIN possui formato inválido.'),
})

type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export function ResetPasswordSecondStage() {
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
    values: {
      pin: '',
    },
  })

  const isSubmitDisabled = !isValid || isSubmitting

  const navigation = useNavigation()

  async function handleResetPasswordSecondStage() {
    if (!isValid) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    navigation.navigate('reset_password_third_stage')
  }

  return (
    <View className="flex-1">
      <View className="mt-auto gap-y-5">
        <Text className="font-sans-bold text-2xl text-sky-800">Verificação em 2 etapas</Text>
        <Text className="font-sans-regular text-xl text-sky-800">
          Antes de cadastrar uma senha, digite o PIN enviado para o seu e-mail:
        </Text>
        <View className="flex w-full flex-1 flex-row items-center gap-2">
          <Ionicons name="mail-outline" size={24} className="pointer-events-none text-sky-400" />
          <AnchorButton
            className="font-sans-bold text-lg text-sky-800"
            value="wil***nam@uninove.br"
          />
        </View>
        <View className="flex-1">
          <Label value="PIN" />
          <Controller
            control={control}
            name="pin"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <OTPInput value={value} type="number" length={4} onChangeText={onChange} />
            )}
          />
        </View>
        <Button
          value="Verificar"
          variant="primary"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleResetPasswordSecondStage)}
        />
      </View>
    </View>
  )
}
