import { Announcement } from '@@types/announcement'
import IOSShareOutlined from '@material-symbols/svg-600/outlined/ios_share.svg'
import { cn } from '@utils/cn'
import { DEFAULT_DATETIME, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'
import { Share, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

svgCssInterop([IOSShareOutlined])

type Props = {
  announcement: Announcement
} & TouchableOpacityProps

export function AnnouncementCard({
  announcement: { title, department, publishedAt, isNew },
  className,
  ...props
}: Props) {
  async function handleShareAnnouncement() {
    await Share.share({
      message: 'https://intranet-dev.uninove.br/comunicados',
    })
  }

  return (
    <TouchableOpacity
      className={cn('justify-end gap-y-6 bg-slate-100 p-6 shadow shadow-sky-900/70', className, {
        'bg-sky-50': isNew,
      })}
      activeOpacity={0.7}
      {...props}
    >
      <View className="gap-y-2">
        {isNew && (
          <Text className="mr-auto bg-sky-400 px-3 py-0.5 font-sans-semibold text-sm uppercase text-white">
            Novo
          </Text>
        )}
        <Text className="font-sans-bold text-2xl text-sky-900" numberOfLines={2}>
          {title}
        </Text>
        <View>
          <Text className="font-sans-bold text-lg text-sky-900">{department}</Text>
          <Text className="font-sans-regular text-lg text-sky-900">
            {formatDateToLocale(publishedAt, DEFAULT_DATETIME)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="mr-auto h-10 w-10 items-center justify-center"
        activeOpacity={0.7}
        onPress={handleShareAnnouncement}
      >
        <IOSShareOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
