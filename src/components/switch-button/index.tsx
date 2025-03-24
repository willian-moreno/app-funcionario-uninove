import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

type Props = {
  value?: boolean
  onChangeValue?: (isActive: boolean) => void
} & TouchableOpacityProps

export function SwitchButton({
  className,
  disabled,
  value = false,
  onChangeValue = () => {},
  ...props
}: Props) {
  const [isActive, setIsActive] = useState(value)

  function handleToggleActivation() {
    if (disabled) {
      return
    }

    const newState = !isActive

    setIsActive(newState)
    onChangeValue(newState)
  }

  useEffect(() => setIsActive(value), [value])

  return (
    <TouchableOpacity
      className={cn('h-8 w-14 rounded-full bg-slate-300 p-1 shadow shadow-sky-800/70', className, {
        'bg-sky-800': isActive && !disabled,
        'bg-sky-800/20': isActive && disabled,
        'bg-slate-200': !isActive && disabled,
      })}
      onPress={handleToggleActivation}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <View
        className={cn('aspect-square h-full rounded-full bg-white shadow-sm', {
          'ml-auto': isActive,
        })}
      />
    </TouchableOpacity>
  )
}
