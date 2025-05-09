import { ReactNode } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

import { cn } from '@utils/cn'

type Props = {
  children: ReactNode
  isVisible: SharedValue<boolean>
  duration?: number
} & ViewProps

export function Content({
  isVisible,
  children,
  duration = 500,
  className,
  style,
  ...props
}: Props) {
  const offset = useSharedValue(0)

  const progress = useDerivedValue(() => withTiming(isVisible.value ? 0 : 1, { duration }))

  const sheetStyle = useAnimatedStyle(() => ({
    opacity: isVisible.value ? 1 : withTiming(-1, { duration }),
    transform: [{ translateY: progress.value * 2 * offset.value }],
    zIndex: isVisible.value ? 2 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  return (
    <Animated.View
      className={cn(
        'absolute bottom-0 -z-10 h-[90vh] w-full flex-1 rounded-t-3xl bg-white opacity-0',
        className,
      )}
      style={[sheetStyle, style]}
      onLayout={(e) => {
        offset.set(e.nativeEvent.layout.height)
      }}
      {...props}
    >
      {children}
    </Animated.View>
  )
}
