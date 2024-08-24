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

export const icon = {
  logo: "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjQxLCJwdXIiOiJibG9iX2lkIn19--f03c38b1aacd23d60193de4ecb2cd9c1fabf3d95/I%20(5).png",
  video:
    "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjM4LCJwdXIiOiJibG9iX2lkIn19--de90f4847543ad853f7abfc9fa4eeed54eafb592/live-video-47b604bc1a4775322aac2ba15ab09681891be4de298889b12d37d63b3298d2bb.png",
  photo:
    "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjM5LCJwdXIiOiJibG9iX2lkIn19--b5120ae9624c5743157989e320b82f428f17411f/photo-video-a4153dea47c25b60c03b6f448bc566439129d781bcb21ba5f9c52fe7e4c41c20.png",
  event:
    "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjQwLCJwdXIiOiJibG9iX2lkIn19--b246bd924800d182c3abac0868e71a9144d4cc21/life-event-5e5f06fb17a6788e156f1f8d3fc62268af400476d42b3c8b100c576e9c67c587.png",
  noProfilePhoto:
    "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3LCJwdXIiOiJibG9iX2lkIn19--26b5868d904c8a5011f1a4f76bf18f235ce0a2a3/I%20(6).png",
}
