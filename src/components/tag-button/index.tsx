import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  value?: string
} & TouchableOpacityProps

export function TagButton({ children, className, value = '', ...props }: Props) {
  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center rounded-full bg-sky-50 px-4 py-1 uppercase shadow shadow-sky-900/70',
        className,
      )}
      activeOpacity={0.7}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Text
          className="mx-auto font-sans-bold text-sm uppercase text-sky-900"
          numberOfLines={1}
        >
          {value}
        </Text>
      )}
    </TouchableOpacity>
  )
}
