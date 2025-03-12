import { Ionicons } from '@expo/vector-icons'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'

type Props = {} & TextInputProps

export function InputPassword({ className, ...props }: Props) {
  const [isInvisible, setIsInvisible] = useState(true)

  function handleInvertVisibility() {
    setIsInvisible((state) => !state)
  }

  return (
    <View className="flex h-14 w-full flex-row gap-x-4 rounded-sm bg-white pl-4 text-lg text-sky-800 shadow shadow-slate-800/10">
      <TextInput
        className={cn(
          'h-14 flex-1 bg-white text-lg text-sky-800',
          'placeholder:text-slate-300',
          className,
        )}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        secureTextEntry={isInvisible}
        {...props}
      />
      <TouchableOpacity
        className="flex aspect-square items-center justify-center"
        activeOpacity={0.7}
        onPress={handleInvertVisibility}
      >
        <Ionicons
          name={isInvisible ? 'eye-outline' : 'eye-off-outline'}
          size={24}
          className="pointer-events-none text-slate-300"
        />
      </TouchableOpacity>
    </View>
  )
}
