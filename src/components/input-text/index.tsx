import { cn } from '@utils/cn'
import { RefObject } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

type Props = {
  inputRef?: RefObject<TextInput> | null
} & TextInputProps

export function InputText({ className, inputRef, ...props }: Props) {
  return (
    <View className="flex h-14 w-full flex-row gap-x-4 rounded-sm bg-white pl-4 shadow shadow-slate-800/10">
      <TextInput
        ref={inputRef}
        className={cn(
          'h-14 flex-1 bg-white text-lg text-sky-800',
          'placeholder:text-slate-300',
          className,
        )}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  )
}
