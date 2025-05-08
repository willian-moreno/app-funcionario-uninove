import { RefObject, useEffect, useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'

import VisibilityOffOutlined from '@material-symbols/svg-600/outlined/visibility_off.svg'
import VisibilityOutlined from '@material-symbols/svg-600/outlined/visibility.svg'

import { cn } from '@utils/cn'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([VisibilityOutlined, VisibilityOffOutlined])

type Props = {
  inputRef?: RefObject<TextInput> | null
} & TextInputProps

export function PasswordInput({ className, inputRef, readOnly, ...props }: Props) {
  const [isInvisible, setIsInvisible] = useState(true)

  function handleInvertVisibility() {
    setIsInvisible((state) => !state)
  }

  useEffect(() => {
    if (readOnly) {
      setIsInvisible(true)
    }
  }, [readOnly])

  return (
    <View className="flex h-14 w-full flex-row gap-x-4 bg-white pl-4 shadow shadow-sky-900/70">
      <TextInput
        ref={inputRef}
        className={cn('h-14 flex-1 text-lg text-sky-900', 'placeholder:text-slate-300', className)}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        secureTextEntry={isInvisible}
        readOnly={readOnly}
        {...props}
      />
      <TouchableOpacity
        className="flex aspect-square items-center justify-center"
        activeOpacity={0.7}
        disabled={readOnly}
        onPress={handleInvertVisibility}
      >
        {isInvisible ? (
          <VisibilityOutlined className="pointer-events-none h-8 w-8 fill-slate-300 leading-none" />
        ) : (
          <VisibilityOffOutlined className="pointer-events-none h-8 w-8 fill-slate-300 leading-none" />
        )}
      </TouchableOpacity>
    </View>
  )
}
