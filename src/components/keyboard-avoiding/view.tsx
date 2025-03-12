import { cn } from '@utils/cn'
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native'

type Props = {} & KeyboardAvoidingViewProps

export function View({ children, className, ...props }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={cn('flex-1', className)}
      keyboardVerticalOffset={10}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
