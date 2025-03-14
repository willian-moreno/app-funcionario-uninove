import { cn } from '@utils/cn'
import { useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native'

type OTPInputType = 'text' | 'number' | 'password'

type Props = {
  value?: string
  type?: OTPInputType
  length?: number
  readOnly?: boolean
  onChangeText?: (text: string) => void
}

const typesConfig: Record<
  OTPInputType,
  {
    keyboardType: 'default' | 'numeric'
    inputMode: 'text' | 'numeric'
    secureTextEntry: boolean
    sanitizeOnPressing: (value: string) => string
  }
> = {
  text: {
    keyboardType: 'default',
    inputMode: 'text',
    secureTextEntry: false,
    sanitizeOnPressing: (value: string) => value,
  },
  number: {
    keyboardType: 'numeric',
    inputMode: 'numeric',
    secureTextEntry: false,
    sanitizeOnPressing: (value: string) => value.replace(/\D+/, ''),
  },
  password: {
    keyboardType: 'default',
    inputMode: 'text',
    secureTextEntry: true,
    sanitizeOnPressing: (value: string) => value,
  },
}

export function OTPInput({
  value: defaultValue = '',
  type = 'number',
  length = 4,
  readOnly = false,
  onChangeText = () => {},
}: Props) {
  const [value, setValue] = useState(defaultValue)
  const [values, setValues] = useState<{ position: number; value: string }[]>(() => {
    return Array.from({ length }).map((_, index) => ({
      position: index,
      value: defaultValue && defaultValue[index] ? defaultValue[index] : '',
    }))
  })

  const inputsRef = useRef<Map<number, TextInput | null>>(new Map())

  const { keyboardType, inputMode, secureTextEntry, sanitizeOnPressing } = typesConfig[type]

  function handleInputKeyPress(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    currentPosition: number,
  ) {
    const currentPositionValue = value[currentPosition] ?? ''

    if (event.nativeEvent.key === 'Backspace') {
      onBackspacePressed(currentPosition, currentPositionValue)
    }
  }

  function onBackspacePressed(currentPosition: number, currentPositionValue: string) {
    const previousPosition = currentPosition - 1

    if (previousPosition < 0 || currentPositionValue.length) {
      return
    }

    handleUpdateValuePosition(previousPosition, '')
  }

  function handleUpdateValuePosition(currentPosition: number, value: string) {
    const sanitizedValue = sanitizeOnPressing(value)

    setValues((state) => {
      state[currentPosition].value = sanitizedValue

      return [...state]
    })
  }

  function reallocateCharacters() {
    const newValues = Array.from({ length }).map((_, index) => ({
      position: index,
      value: value[index] ?? '',
    }))

    setValues(newValues)
  }

  function focusNextEmptyField() {
    const nextPositionToFocus = values.findIndex(({ value }) => value === '')

    if (nextPositionToFocus === -1) {
      return
    }

    inputsRef.current.get(nextPositionToFocus)?.focus()
  }

  useEffect(() => {
    const newValue = values.map(({ value }) => value).join('')
    setValue(newValue)
  }, [values])

  useEffect(() => {
    reallocateCharacters()
    focusNextEmptyField()
    onChangeText(value)
  }, [value])

  return (
    <View className="flex-1">
      <View className="flex w-full flex-1 flex-row flex-wrap items-center gap-2">
        {values.map(({ position, value }) => (
          <TextInput
            key={position}
            ref={(el) => inputsRef.current.set(position, el)}
            value={value}
            className={cn(
              'flex h-14 w-full min-w-9 flex-1 rounded-sm bg-white px-4 text-center text-lg text-sky-800 shadow shadow-slate-800/10',
              'placeholder:text-slate-300',
            )}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            maxLength={1}
            keyboardType={keyboardType}
            inputMode={inputMode}
            secureTextEntry={secureTextEntry}
            textContentType="oneTimeCode"
            readOnly={readOnly}
            onKeyPress={(event) => handleInputKeyPress(event, position)}
            onChangeText={(value) => {
              handleUpdateValuePosition(position, value)
            }}
          />
        ))}
      </View>
    </View>
  )
}
