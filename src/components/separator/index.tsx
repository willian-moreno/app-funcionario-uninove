import { View, ViewProps } from 'react-native'

import { cn } from '@utils/cn'

type Props = {
  orientation?: 'horizontal' | 'vertical'
} & ViewProps

export function Separator({ orientation = 'horizontal', className, ...props }: Props) {
  return (
    <View
      className={cn('bg-slate-100', className, {
        'h-0.5 w-full': orientation === 'horizontal',
        'h-full w-0.5': orientation === 'vertical',
      })}
      {...props}
    />
  )
}
