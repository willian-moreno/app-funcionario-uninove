import { Text, View, ViewProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  variant?: 'default' | 'diluted'
} & ViewProps

export function Footer({ className, variant = 'default', ...props }: Props) {
  const currentYear = new Date().getFullYear()
  const version = require('./../../../package.json').version

  return (
    <View className={cn('mt-6 w-full', className)} {...props}>
      <Text
        className={cn('mx-auto font-sans-regular text-base', {
          'text-sky-900': variant === 'default',
          'text-sky-900/50': variant === 'diluted',
        })}
      >
        ® 1972 - {currentYear} UNINOVE.
      </Text>
      <Text
        className={cn('mx-auto font-sans-regular text-base', {
          'text-sky-900': variant === 'default',
          'text-sky-900/50': variant === 'diluted',
        })}
      >
        Todos os direitos reservados
      </Text>
      <Text
        className={cn('mx-auto font-sans-regular text-sm', {
          'text-sky-900': variant === 'default',
          'text-sky-900/50': variant === 'diluted',
        })}
      >
        v. {version}
      </Text>
    </View>
  )
}
