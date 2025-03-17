import { Ionicons } from '@expo/vector-icons'
import { cn } from '@utils/cn'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  icon: keyof typeof Ionicons.glyphMap
} & TouchableOpacityProps

export function IconButton({ icon, disabled, className, ...props }: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-100',
        className,
      )}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Ionicons name={icon} className="text-3xl font-semibold text-sky-800" />
    </TouchableOpacity>
  )
}
