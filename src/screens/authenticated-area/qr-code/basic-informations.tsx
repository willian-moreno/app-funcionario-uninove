import { BottomSheet } from '@components/bottom-sheet'
import { Separator } from '@components/separator'
import { AuthContext } from '@contexts/auth-context-provider'
import BadgeOutlined from '@material-symbols/svg-600/outlined/badge.svg'
import CakeOutlined from '@material-symbols/svg-600/outlined/cake.svg'
import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'
import FlagOutlined from '@material-symbols/svg-600/outlined/flag.svg'
import PersonOutlined from '@material-symbols/svg-600/outlined/person.svg'
import SchoolOutlined from '@material-symbols/svg-600/outlined/school.svg'
import { DEFAULT_DATE, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'
import { formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

svgCssInterop([
  BadgeOutlined,
  CakeOutlined,
  CloseOutlined,
  FlagOutlined,
  PersonOutlined,
  SchoolOutlined,
])

type Props = {
  isVisible: SharedValue<boolean>
}

export function BasicInformations({ isVisible }: Props) {
  const { auth } = useContext(AuthContext)

  const intervalBetweenDateOfAdmissionAndNow = intervalToDuration({
    start: auth.user.dateOfAdmission,
    end: new Date(),
  })

  const distanceBetweenDateOfAdmissionAndNow = formatDuration(
    intervalBetweenDateOfAdmissionAndNow,
    {
      locale: ptBR,
      format: ['years', 'months'],
    },
  )

  function onBottomSheetVisibilityChange() {
    isVisible.set(false)
  }

  return (
    <BottomSheet isVisible={isVisible} onClose={onBottomSheetVisibilityChange}>
      <View className="flex-1 gap-y-6 px-6 pt-6">
        <View className="gap-y-2">
          <View className="flex-row justify-between gap-x-6">
            <Text className="my-auto flex-1 font-sans-bold text-2xl text-sky-900" numberOfLines={2}>
              Informações básicas
            </Text>
            <TouchableOpacity
              className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
              activeOpacity={0.7}
              onPress={onBottomSheetVisibilityChange}
            >
              <CloseOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          className="gap-y-6"
          contentContainerClassName="flex-grow gap-y-6 pb-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center gap-x-6">
            <PersonOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
            <View>
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                Nome completo
              </Text>
              <Text className="font-sans-bold text-lg text-sky-900">{auth.user.fullName}</Text>
            </View>
          </View>
          <Separator orientation="horizontal" />
          <View className="flex-row items-center gap-x-6">
            <SchoolOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
            <View>
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Campus</Text>
              <Text className="font-sans-bold text-lg text-sky-900">{auth.user.campus}</Text>
            </View>
          </View>
          <Separator orientation="horizontal" />
          <View className="flex-row items-center gap-x-6">
            <FlagOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
            <View>
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Setor</Text>
              <Text className="font-sans-bold text-lg text-sky-900">{auth.user.department}</Text>
            </View>
          </View>
          <Separator orientation="horizontal" />
          <View className="flex-row items-center gap-x-6">
            <BadgeOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
            <View>
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Cargo</Text>
              <Text className="font-sans-bold text-lg text-sky-900">{auth.user.position}</Text>
            </View>
          </View>
          <Separator orientation="horizontal" />
          <View className="flex-row items-center gap-x-6">
            <CakeOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
            <View>
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                Data de admissão
              </Text>
              <Text className="font-sans-bold text-lg text-sky-900">
                {formatDateToLocale(auth.user.dateOfAdmission, DEFAULT_DATE)}
              </Text>
              {distanceBetweenDateOfAdmissionAndNow.length > 0 && (
                <Text className="font-sans-bold text-sm uppercase text-sky-700">
                  {distanceBetweenDateOfAdmissionAndNow}
                </Text>
              )}
            </View>
          </View>
          <Separator orientation="horizontal" />
          <Text className="font-sans-regular text-xl text-sky-900">
            Caso haja divergência em algum dado, entre em contato com o RH.{' '}
          </Text>
        </ScrollView>
      </View>
    </BottomSheet>
  )
}
