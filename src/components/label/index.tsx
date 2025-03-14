import { cn } from '@utils/cn'
import { Text, TextProps } from 'react-native'

type Props = {
  value: string
} & TextProps

export function Label({ value, className, ...props }: Props) {
  return (
    <Text className={cn('font-sans-medium mb-2 text-lg text-sky-800', className)} {...props}>
      {value}
    </Text>
  )
}
