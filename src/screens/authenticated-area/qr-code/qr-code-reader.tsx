import { BottomSheet } from '@components/bottom-sheet'
import { Loading } from '@components/loading'
import CameraswitchOutlined from '@material-symbols/svg-600/outlined/cameraswitch.svg'
import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'
import FlashlightOffOutlined from '@material-symbols/svg-600/outlined/flashlight_off.svg'
import FlashlightOnOutlined from '@material-symbols/svg-600/outlined/flashlight_on.svg'
import { svgCssInterop } from '@utils/svg-css-interop'
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import * as Clipboard from 'expo-clipboard'
import * as Linking from 'expo-linking'
import { useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { runOnJS, SharedValue, useAnimatedReaction } from 'react-native-reanimated'

svgCssInterop([CameraswitchOutlined, CloseOutlined, FlashlightOffOutlined, FlashlightOnOutlined])

type Props = {
  isVisible: SharedValue<boolean>
}

export function QRCodeReader({ isVisible }: Props) {
  const [isActive, setIsActive] = useState(false)
  const [isFlashActive, setIsFlashActive] = useState(false)
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission] = useCameraPermissions()

  function handleCloseBottomSheet() {
    isVisible.set(false)
  }

  async function onBarcodeScanned(scanningResult: BarcodeScanningResult) {
    if (scanningResult.type !== 'qr') {
      return
    }

    if (await Linking.canOpenURL(scanningResult.data)) {
      setIsActive(false)

      Alert.alert('QR Code', `Abrir o link "${scanningResult.data}" no navegador?`, [
        {
          text: 'Abrir',
          onPress: async () => {
            await Linking.openURL(scanningResult.data)

            isVisible.set(false)

            return
          },
        },
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => {
            setIsActive(true)
          },
        },
      ])

      return
    }

    if (['string', 'number', 'bigint'].includes(typeof scanningResult.data)) {
      await Clipboard.setStringAsync(scanningResult.data)

      isVisible.set(false)

      return
    }
  }

  function handleToggleCameraFacing() {
    setFacing((state) => {
      if (state === 'back') {
        return 'front'
      }

      return 'back'
    })
  }

  function handleToggleFlash() {
    setIsFlashActive(!isFlashActive)
  }

  useAnimatedReaction(
    () => isVisible.value,
    (currentState, beforeState) => {
      if (currentState !== beforeState) {
        runOnJS(setIsActive)(currentState)
      }
    },
    [],
  )

  return (
    <>
      <BottomSheet.Overlay isVisible={isVisible} onClose={handleCloseBottomSheet} />
      <BottomSheet.Content isVisible={isVisible} className="bg-sky-950">
        <View className="flex-1 gap-y-6 px-6 pt-6">
          <View className="gap-y-2">
            <View className="flex-row justify-between gap-x-6">
              <Text className="my-auto flex-1 font-sans-bold text-2xl text-white" numberOfLines={2}>
                Leitor de QR Code
              </Text>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-transparent"
                activeOpacity={1}
                onPress={handleCloseBottomSheet}
              >
                <CloseOutlined className="pointer-events-none h-8 w-8 fill-white" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            className="gap-y-6"
            contentContainerClassName="flex-grow gap-y-6 pb-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {permission ? (
              <View className="flex-1 gap-y-6">
                <>
                  {isActive ? (
                    <>
                      <View className="flex-1 items-center justify-center">
                        <View className="aspect-square w-[90%] overflow-hidden rounded-lg border-2 border-white">
                          <CameraView
                            active={isActive}
                            facing={facing}
                            enableTorch={isFlashActive}
                            autofocus="on"
                            mode="picture"
                            mute
                            style={[StyleSheet.absoluteFill]}
                            barcodeScannerSettings={{
                              barcodeTypes: ['qr'],
                            }}
                            onBarcodeScanned={onBarcodeScanned}
                          />
                        </View>
                      </View>
                      <View className="flex-row items-center justify-center gap-x-12 py-6">
                        <Pressable
                          className="h-20 w-20 items-center justify-center rounded-full border border-white bg-transparent"
                          onPress={handleToggleCameraFacing}
                        >
                          <CameraswitchOutlined className="pointer-events-none h-12 w-12 fill-white" />
                        </Pressable>
                        {isFlashActive ? (
                          <Pressable
                            className="h-20 w-20 items-center justify-center rounded-full border border-sky-400 bg-sky-400"
                            onPress={handleToggleFlash}
                          >
                            <FlashlightOnOutlined className="pointer-events-none h-12 w-12 fill-white" />
                          </Pressable>
                        ) : (
                          <Pressable
                            className="h-20 w-20 items-center justify-center rounded-full border border-white bg-transparent"
                            onPress={handleToggleFlash}
                          >
                            <FlashlightOffOutlined className="pointer-events-none h-12 w-12 fill-white" />
                          </Pressable>
                        )}
                      </View>
                    </>
                  ) : null}
                </>
              </View>
            ) : (
              <Loading variant="light" />
            )}
          </ScrollView>
        </View>
      </BottomSheet.Content>
    </>
  )
}
