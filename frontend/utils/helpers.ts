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
