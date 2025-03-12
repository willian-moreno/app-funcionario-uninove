import { cn } from '@utils/cn'
import { Text, TextProps } from 'react-native'

type Props = {
  value: string
} & TextProps

export function Label({ value, className, ...props }: Props) {
  return (
    <Text className={cn('mb-2 font-bold text-xl text-sky-800', className)} {...props}>
      {value}
    </Text>
  )
}
