import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

import DeleteOutlined from '@material-symbols/svg-600/outlined/delete.svg'

import { Bedge } from '@components/bedge'

import { cn } from '@utils/cn'
import { DEFAULT_DATETIME, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([DeleteOutlined])

type Props = {
  id: string
  title: string
  description: string
  createdAt: string
  isVisualised: boolean
  onRemove: (id: string) => void
} & TouchableOpacityProps

export function NotificationCard({
  id,
  title,
  description,
  createdAt,
  isVisualised,
  className,
  onRemove,
  ...props
}: Props) {
  function handleRemoveNotification() {
    onRemove(id)
  }

  return (
    <TouchableOpacity
      className={cn('flex-1 flex-row items-center gap-x-6 py-6', className)}
      activeOpacity={0.7}
      {...props}
    >
      <View className="pointer-events-none flex-1 gap-y-2">
        <Bedge.Root>
          {!isVisualised && <Bedge.Dot className="-left-4 h-2 w-2" />}
          <Text
            className={cn('font-sans-semibold text-xl text-sky-900', {
              'text-sky-900/50': isVisualised,
            })}
            numberOfLines={2}
          >
            {title}
          </Text>
        </Bedge.Root>
        <Text
          className={cn('font-sans-regular text-xl text-sky-900', {
            'text-sky-900/50': isVisualised,
          })}
          numberOfLines={2}
        >
          {description}
        </Text>
        <Text
          className={cn('font-sans-regular text-lg text-sky-900/50', {
            'text-sky-900/20': isVisualised,
          })}
        >
          {formatDateToLocale(createdAt, DEFAULT_DATETIME)}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="-mr-4 p-4"
        onPress={handleRemoveNotification}
      >
        <DeleteOutlined className="pointer-events-none h-6 w-6 fill-sky-900 leading-none" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
