import { cn } from '@utils/cn'
import { Text, View } from 'react-native'

type Props = {
  variant?: 'default' | 'diluted'
}

export function Footer({ variant = 'default' }: Props) {
  const currentYear = new Date().getFullYear()
  const version = require('./../../../package.json').version

  return (
    <View className="mt-5 w-full">
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
