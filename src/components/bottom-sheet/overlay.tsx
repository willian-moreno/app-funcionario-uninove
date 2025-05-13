import { Pressable, ViewProps } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

import { cn } from '@utils/cn'

type Props = {
  isVisible: SharedValue<boolean>
  duration?: number
  onClose: () => void
} & ViewProps

export function Overlay({ isVisible, duration = 500, onClose, className, style, ...props }: Props) {
  const progress = useDerivedValue(() => withTiming(isVisible.value ? 0 : 1, { duration }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isVisible.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  return (
    <Animated.View
      className={cn('absolute inset-0 -z-10 h-svh w-svw bg-black/70 opacity-0', className)}
      style={[backdropStyle, style]}
      {...props}
    >
      <Pressable
        className="flex-1"
        onPress={onClose}
      />
    </Animated.View>
  )
}
