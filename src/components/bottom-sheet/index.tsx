import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  isVisible: SharedValue<boolean>
  duration?: number
  onVisibilityChange: () => void
} & ViewProps

export function BottomSheet({ isVisible, children, duration = 150, onVisibilityChange }: Props) {
  const offset = useSharedValue(0)

  const progress = useDerivedValue(() => withTiming(isVisible.value ? 0 : 1, { duration }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isVisible.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }))

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * offset.value }],
    display: isVisible.value ? 'flex' : withDelay(duration, withTiming('none', { duration: 0 })),
  }))

  return (
    <>
      <Animated.View
        className="absolute -top-full bg-black/20"
        style={[StyleSheet.absoluteFillObject, backdropStyle]}
      >
        <TouchableOpacity className="flex-1" onPress={onVisibilityChange} />
      </Animated.View>
      <Animated.View
        className="absolute bottom-0 z-[2] h-[90vh] w-full flex-1 gap-y-2 rounded-t-3xl bg-slate-100 transition-opacity"
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
