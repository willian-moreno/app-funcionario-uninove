import { User } from '@@types/user'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { VacancieSvg } from '@components/vacancie-svg'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { findAuthStorage } from '@storage/auth/find-auth-storage'
import { useCallback, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'

export function EmployeeOnVacation() {
  const navigation = useNavigation()

  const [isScreenLoading, setIsScreenLoading] = useState(true)

  const [user, setUser] = useState<User>()

  const firstName = user?.fullName.split(' ')[0] ?? ''

  const windowWidth = Math.round(Dimensions.get('window').width)

  const svgDecreaseLeft = windowWidth * 0.3
  const svgWidth = windowWidth + windowWidth * 0.25
  const svgHeight = svgWidth * 0.85

  async function findStoredUser() {
    try {
      const auth = await findAuthStorage()

      if (!auth) {
        navigation.navigate('sign_in')
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'sign_in' }],
          }),
        )

        return
      }

      setUser(auth.user)
    } catch (error) {
    } finally {
      setIsScreenLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      findStoredUser()
    }, []),
  )

  if (isScreenLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 gap-5">
      <View className="flex-row items-center gap-2">
        <ProfileButton fullUserName={user?.fullName} onPress={() => {}} />
        <Text className="font-sans-bold text-2xl text-sky-800">Olá, {firstName}</Text>
      </View>
      <View className="mt-auto gap-2">
        <Text className="font-sans-bold text-xl text-sky-800">
          Aproveite suas férias para descansar e recarregar as energias.
        </Text>
        <Text className="font-sans-bold text-xl text-sky-800">
          Você merece! Boas férias! <Text className="text-2xl">😎</Text>
        </Text>
      </View>
      <View className="mt-auto flex-1 justify-end">
        <VacancieSvg
          style={{
            width: svgWidth,
            height: svgHeight,
            marginLeft: -svgDecreaseLeft,
          }}
        />
      </View>
    </View>
  )
}
