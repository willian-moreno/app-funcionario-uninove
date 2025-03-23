import { AnchorButton } from '@components/anchor-button'
import { Button } from '@components/button'
import { Label } from '@components/label'
import { OTPInput } from '@components/otp-input'
import { zodResolver } from '@hookform/resolvers/zod'
import MailOutlined from '@material-symbols/svg-500/outlined/mail.svg'
import { useNavigation } from '@react-navigation/native'
import { cssInterop } from 'nativewind'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

cssInterop(MailOutlined, {
  className: {
    target: 'style',
    nativeStyleToProp: { width: true, height: true, fill: true },
  },
})

const resetPasswordForm = z.object({
  pin: z.string().regex(/^\d{4}$/, 'PIN possui formato inválido.'),
})

type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export function ResetPasswordSecondStage() {
  const navigation = useNavigation()

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

  async function handleResetPasswordSecondStage() {
    if (!isValid) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    navigation.navigate('reset_password_third_stage')
  }

  return (
    <View className="flex-1">
      <View className="mt-auto gap-y-6">
        <Text className="font-sans-bold text-2xl text-sky-900">Verificação em 2 etapas</Text>
        <Text className="font-sans-regular text-xl text-sky-900">
          Antes de cadastrar uma senha, digite o PIN enviado para o seu e-mail:
        </Text>
        <View className="flex w-full flex-1 flex-row items-center gap-2">
          <MailOutlined className="pointer-events-none h-8 w-8 fill-sky-400 leading-none" />
          <AnchorButton
            className="font-sans-bold text-lg text-sky-900"
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
              <OTPInput
                value={value}
                type="number"
                length={4}
                returnKeyLabel="Enviar"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleResetPasswordSecondStage)}
                onChangeText={onChange}
              />
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
