import { cn } from '@utils/cn'
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
  function handleToggleActivation() {
    if (disabled) {
      return
    }

    const newState = !value

    onChangeValue(newState)
  }

  return (
    <TouchableOpacity
      className={cn('h-8 w-14 rounded-full bg-slate-300 p-1 shadow shadow-sky-900/70', className, {
        'bg-sky-800': value && !disabled,
        'bg-sky-800/20': value && disabled,
        'bg-slate-200': !value && disabled,
      })}
      onPress={handleToggleActivation}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <View
        className={cn('aspect-square h-full rounded-full bg-white shadow-sm', {
          'ml-auto': value,
        })}
      />
    </TouchableOpacity>
  )
}
