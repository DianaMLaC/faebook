export const formatPostDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }
  return new Date(dateString).toLocaleString("en-US", options).replace(",", " at")
}

export const formatCommentDate = (createdDate: string): string => {
  const created = new Date(createdDate)
  const now = new Date()
  const millisecondsPerMinute = 60 * 1000
  const millisecondsPerHour = millisecondsPerMinute * 60
  const millisecondsPerDay = millisecondsPerHour * 24
  const millisecondsPerWeek = millisecondsPerDay * 7
  const millisecondsPerMonth = millisecondsPerDay * 30
  const millisecondsPerYear = millisecondsPerDay * 365

  const timeDifference = now.getTime() - created.getTime()

  if (timeDifference < millisecondsPerHour) {
    return Math.round(timeDifference / millisecondsPerMinute) + " min"
  } else if (timeDifference < millisecondsPerDay) {
    return Math.round(timeDifference / millisecondsPerHour) + " h"
  } else if (timeDifference < millisecondsPerWeek) {
    return Math.round(timeDifference / millisecondsPerDay) + " d"
  } else if (timeDifference < millisecondsPerMonth) {
    return Math.round(timeDifference / millisecondsPerWeek) + " w"
  } else if (timeDifference < millisecondsPerYear) {
    return Math.round(timeDifference / millisecondsPerMonth) + " m"
  } else {
    return Math.round(timeDifference / millisecondsPerYear) + " y"
  }
}

export const calculateZodiac = (dateOfBirth: string): string => {
  const date = new Date(dateOfBirth)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius"
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces"
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries"
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus"
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini"
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer"
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo"
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo"
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra"
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio"
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius"
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn"
  return ""
}
