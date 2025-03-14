import { cn } from '@utils/cn'
import { Text, View } from 'react-native'

type Props = {
  variant?: 'default' | 'auth'
}

export function Footer({ variant = 'default' }: Props) {
  const currentYear = new Date().getFullYear()
  const version = require('./../../../package.json').version

  return (
    <View className="mt-5 w-full">
      <Text
        className={cn('font-sans-regular mx-auto text-base', {
          'text-sky-800': variant === 'default',
          'text-sky-800/50': variant === 'auth',
        })}
      >
        ® 1972 - {currentYear} UNINOVE.
      </Text>
      <Text
        className={cn('font-sans-regular mx-auto text-base', {
          'text-sky-800': variant === 'default',
          'text-sky-800/50': variant === 'auth',
        })}
      >
        Todos os direitos reservados
      </Text>
      <Text
        className={cn('font-sans-regular mx-auto text-sm', {
          'text-sky-800': variant === 'default',
          'text-sky-800/50': variant === 'auth',
        })}
      >
        v. {version}
      </Text>
    </View>
  )
}
