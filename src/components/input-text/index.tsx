import { cn } from '@utils/cn'
import { TextInput, TextInputProps } from 'react-native'

type Props = {} & TextInputProps

export function InputText({ className, ...props }: Props) {
  return (
    <TextInput
      className={cn(
        'h-14 w-full rounded-sm bg-white px-4 text-lg text-sky-800 shadow shadow-slate-800/10',
        'placeholder:text-slate-300',
        className,
      )}
      autoCapitalize="none"
      underlineColorAndroid="transparent"
      {...props}
    />
  )
}
