import { useRef, useState } from 'react'
import { ViewProps } from 'react-native'
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

import { cn } from '@utils/cn'

type Props = {
  isVisible: SharedValue<boolean>
  autoHide?: boolean
  timeout?: number
  animationDuration?: number
  onClose: () => void
} & ViewProps

export function Content({
  isVisible,
  children,
  className,
  style,
  autoHide = false,
  timeout = 5000,
  animationDuration = 500,
  onClose,
  ...props
}: Props) {
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const offset = useSharedValue(0)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const progress = useDerivedValue(() =>
    withTiming(isVisible.value ? 0 : 1, { duration: animationDuration }),
  )

  const sheetStyle = useAnimatedStyle(() => ({
    opacity: isVisible.value ? 1 : withTiming(-1, { duration: animationDuration }),
    transform: [{ translateY: progress.value * 2 * offset.value }],
    zIndex: isVisible.value ? 2 : withDelay(animationDuration, withTiming(-1, { duration: 0 })),
  }))

  if (!isComponentVisible && timeoutRef.current) {
    clearTimeout(timeoutRef.current)
  }

  if (isComponentVisible && autoHide) {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(onClose, timeout)
  }

  useAnimatedReaction(
    () => isVisible.value,
    (currentState, beforeState) => {
      if (currentState !== beforeState) {
        runOnJS(setIsComponentVisible)(currentState)
      }
    },
    [],
  )

  return (
    <Animated.View
      className={cn('absolute bottom-8 left-6 right-6 -z-10 flex-1 opacity-0', className)}
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
