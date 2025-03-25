import { Announcement } from '@@types/announcement'
import IOSShareOutlined from '@material-symbols/svg-600/outlined/ios_share.svg'
import { cn } from '@utils/cn'
import { svgCssInterop } from '@utils/svg-css-interop'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Share, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

svgCssInterop([IOSShareOutlined])

type Props = {
  announcement: Announcement
} & TouchableOpacityProps

export function AnnouncementCard({
  announcement: { title, department, publishedAt, isNew },
  ...props
}: Props) {
  async function handleShareAnnouncement() {
    await Share.share({
      message: 'https://intranet-dev.uninove.br/comunicados',
    })
  }

  function formatDate(date: string) {
    return formatInTimeZone(date, 'America/Sao_Paulo', "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    })
  }

  return (
    <TouchableOpacity
      className={cn('justify-end gap-y-6 bg-slate-200 p-6 shadow shadow-sky-800/70', {
        'bg-sky-100': isNew,
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
          <Text className="font-sans-regular text-lg text-sky-900">{formatDate(publishedAt)}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="mr-auto h-10 w-10 items-center justify-center"
        activeOpacity={0.7}
      >
        <IOSShareOutlined className="h-8 w-8 fill-sky-900" onPress={handleShareAnnouncement} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
