import { RefObject } from 'react'
import { TextInput as NativeTextInput, TextInputProps, View } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  inputRef?: RefObject<NativeTextInput | null>
} & TextInputProps

export function TextInput({ className, inputRef, ...props }: Props) {
  return (
    <View className="flex h-14 w-full flex-row gap-x-4 bg-white px-4 shadow shadow-sky-900/70">
      <NativeTextInput
        ref={inputRef}
        className={cn('h-14 flex-1 text-lg text-sky-900', 'placeholder:text-slate-300', className)}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  )
}
