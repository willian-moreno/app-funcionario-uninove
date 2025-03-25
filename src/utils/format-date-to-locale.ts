import { formatInTimeZone, FormatOptionsWithTZ } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale/pt-BR'

export const DEFAULT_DATETIME = "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
export const DEFAULT_DATE = "dd 'de' MMMM 'de' yyyy"

export function formatDateToLocale(
  date: string,
  format: string,
  options: FormatOptionsWithTZ = {},
) {
  return formatInTimeZone(date, 'America/Sao_Paulo', format, {
    locale: ptBR,
    ...options,
  })
}
