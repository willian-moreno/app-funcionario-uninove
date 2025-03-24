import { cssInterop } from 'nativewind'
import { SvgProps } from 'react-native-svg'

export function svgCssInterop(svgs: React.FC<SvgProps>[]) {
  svgs.forEach((Svg) =>
    cssInterop(Svg, {
      className: {
        target: 'style',
        nativeStyleToProp: { width: true, height: true, fill: true },
      },
    }),
  )
}
