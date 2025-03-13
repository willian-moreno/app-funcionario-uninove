export function maskDate(value: string) {
  const regex = new RegExp(/^(\d{0,2})\/?(\d{0,2})\/?(\d{0,4})$/g)

  return value.replace(/\D+/g, '').replace(regex, (_, firstGroup, secondGroup, thirdGroup) => {
    let dateFormatted = ''

    if (firstGroup) {
      dateFormatted += firstGroup
    }

    if (firstGroup && firstGroup.length === 2 && secondGroup.length !== 0) {
      dateFormatted += '/'
    }

    if (secondGroup) {
      dateFormatted += secondGroup
    }

    if (secondGroup && secondGroup.length === 2 && thirdGroup.length !== 0) {
      dateFormatted += '/'
    }

    if (thirdGroup) {
      dateFormatted += thirdGroup
    }

    return dateFormatted
  })
}
