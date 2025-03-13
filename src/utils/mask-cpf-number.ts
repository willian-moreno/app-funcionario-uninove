export function maskCpfNumber(value: string) {
  const regex = new RegExp(/^(\d{0,3})\.?(\d{0,3})\.?(\d{0,3})-?(\d{0,2})$/g)

  return value
    .replace(/\D+/g, '')
    .replace(regex, (_, firstGroup, secondGroup, thirdGroup, fourthGroup) => {
      let cpfFormatted = ''

      if (firstGroup) {
        cpfFormatted += firstGroup
      }

      if (firstGroup && firstGroup.length === 3 && secondGroup.length !== 0) {
        cpfFormatted += '.'
      }

      if (secondGroup) {
        cpfFormatted += secondGroup
      }

      if (secondGroup && secondGroup.length === 3 && thirdGroup.length !== 0) {
        cpfFormatted += '.'
      }

      if (thirdGroup) {
        cpfFormatted += thirdGroup
      }

      if (thirdGroup && thirdGroup.length === 3 && fourthGroup.length !== 0) {
        cpfFormatted += '-'
      }

      if (fourthGroup) {
        cpfFormatted += fourthGroup
      }

      return cpfFormatted
    })
}
