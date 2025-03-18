import { cn } from '@utils/cn'
import { Text, TextProps } from 'react-native'

type Props = {
  value: string
} & TextProps

export function Label({ value, className, ...props }: Props) {
  return (
    <Text className={cn('mb-2 font-sans-semibold text-lg text-sky-900', className)} {...props}>
      {value}
    </Text>
  )
}
