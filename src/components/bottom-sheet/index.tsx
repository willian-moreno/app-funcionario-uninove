import { ReactNode } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  children: ReactNode
  isVisible: SharedValue<boolean>
  duration?: number
  onClose: () => void
}

export function BottomSheet({ isVisible, children, duration = 500, onClose }: Props) {
  const offset = useSharedValue(0)

  const progress = useDerivedValue(() => withTiming(isVisible.value ? 0 : 1, { duration }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isVisible.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  const sheetStyle = useAnimatedStyle(() => ({
    opacity: 1,
    transform: [{ translateY: progress.value * 2 * offset.value }],
    zIndex: isVisible.value ? 2 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  return (
    <>
      <Animated.View
        className="absolute inset-0 -z-10 h-svh w-svw bg-black/20 opacity-0"
        style={[backdropStyle]}
      >
        <Pressable className="flex-1" onPress={onClose} />
      </Animated.View>
      <Animated.View
        className="absolute bottom-0 -z-10 h-[90vh] w-full flex-1 rounded-t-3xl bg-white opacity-0"
        style={[sheetStyle]}
        onLayout={(e) => {
          offset.set(e.nativeEvent.layout.height)
        }}
      >
        {children}
      </Animated.View>
    </>
  )
}
